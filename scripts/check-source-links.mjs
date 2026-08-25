import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const chipDirectory = fileURLToPath(new URL('../src/content/chips/', import.meta.url))
const files = (await readdir(chipDirectory)).filter((file) => file.endsWith('.json'))
const records = await Promise.all(files.map(async (file) => JSON.parse(await readFile(join(chipDirectory, file), 'utf8'))))
const urls = [...new Set(records.flatMap((record) => (record.sources ?? []).map((source) => source.url)))]

async function check(url) {
  try {
    const headers = { 'user-agent': 'Mozilla/5.0 ProcessorWikiLinkCheck/1.0', accept: 'text/html,application/pdf;q=0.9,*/*;q=0.8' }
    let response = await fetch(url, { method: 'HEAD', headers, redirect: 'follow', signal: AbortSignal.timeout(20000) })
    if (response.status >= 400) response = await fetch(url, { method: 'GET', headers, redirect: 'follow', signal: AbortSignal.timeout(20000) })
    const reachable = response.status !== 404 && response.status < 500
    return { url, status: response.status, reachable }
  } catch (error) {
    return { url, status: error instanceof Error ? error.message : 'network error', reachable: false }
  }
}

const concurrency = 6
const results = []
for (let index = 0; index < urls.length; index += concurrency) {
  results.push(...await Promise.all(urls.slice(index, index + concurrency).map(check)))
}

for (const result of results) {
  console.log(`${result.reachable ? 'OK' : 'FAIL'} ${result.status} ${result.url}`)
}

const failures = results.filter((result) => !result.reachable)
console.log(`\n${urls.length} unique source URLs checked; ${failures.length} failed.`)
if (failures.length) process.exitCode = 1
