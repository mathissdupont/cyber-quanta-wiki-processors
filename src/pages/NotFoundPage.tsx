import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <article className="wiki-article"><header className="article-header"><p className="breadcrumb">Hata</p><h1>Sayfa bulunamadı</h1><p className="lead">İstenen wiki maddesi mevcut değil veya adresi değişmiş olabilir.</p></header><p><Link to="/">Ana sayfaya dön</Link> veya <Link to="/chips">çip kataloğunu aç</Link>.</p></article>
}

