import './App.css'
import { useState } from 'react'

// ====================================================================
// KOMPONEN 1: HEADER - Navigasi utama platform streaming
// ====================================================================
// Fungsi: Menampilkan logo, menu navigasi, search bar, dan user profile
function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  // Fungsi untuk handle pencarian video
  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Mencari video:', searchQuery)
  }

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <span className="logo-icon">▶️</span>
        <span className="logo-text">StreamHub</span>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <a href="#" className="nav-item active">Beranda</a>
        <a href="#" className="nav-item">Trending</a>
        <a href="#" className="nav-item">Kategori</a>
        <a href="#" className="nav-item">Langganan</a>
      </nav>

      {/* Search Bar - Input pencarian */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Cari video..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">🔍</button>
      </form>

      {/* User Profile */}
      <div className="user-profile">
        <span className="notification-icon">🔔</span>
        <div className="profile-avatar">👤</div>
      </div>
    </header>
  )
}

// ====================================================================
// KOMPONEN 2: FEATURED VIDEO - Video unggulan di bagian atas
// ====================================================================
// Fungsi: Menampilkan video featured dengan deskripsi dan tombol aksi
function FeaturedVideo() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="featured-video">
      {/* Background video/thumbnail */}
      <div className="featured-backdrop">
        {isPlaying ? (
          <div className="video-player">
            <video controls autoPlay>
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>
          </div>
        ) : (
          <div className="featured-thumbnail">
            <div className="play-button" onClick={() => setIsPlaying(true)}>
              ▶️
            </div>
          </div>
        )}
      </div>

      {/* Featured content info */}
      <div className="featured-content">
        <h2 className="featured-title">Tutorial React Lengkap 2026</h2>
        <div className="featured-meta">
          <span className="badge">FEATURED</span>
          <span className="duration">45 menit</span>
          <span className="rating">⭐ 4.9</span>
        </div>
        <p className="featured-description">
          Pelajari React dari dasar hingga advanced dengan project-project real world yang akan meningkatkan skill Anda sebagai developer.
        </p>
        <div className="featured-actions">
          <button className="btn-play" onClick={() => setIsPlaying(true)}>▶️ Tonton Sekarang</button>
          <button className="btn-add">➕ Tambah ke Watchlist</button>
        </div>
      </div>
    </div>
  )
}

// ====================================================================
// KOMPONEN 3: CATEGORY FILTER - Filter video berdasarkan kategori
// ====================================================================
// Fungsi: Menampilkan tombol kategori untuk memfilter video
function CategoryFilter({ onCategoryChange }) {
  const categories = ['Semua', 'Coding', 'Design', 'Marketing', 'Business', 'Entertainment']

  return (
    <div className="category-filter">
      {categories.map((category, index) => (
        <button
          key={index}
          className="category-btn"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

// ====================================================================
// KOMPONEN 4: VIDEO CARD - Kartu video individual
// ====================================================================
// Fungsi: Menampilkan thumbnail video dengan informasi dasar
// Props: Menerima data video (title, duration, views, dll) dari parent component
function VideoCard({ video, onPlay }) {
  return (
    <div className="video-card">
      {/* Thumbnail - gambar video */}
      <div className="video-thumbnail">
        <img src={video.thumbnail} alt={video.title} />
        <div className="video-duration">{video.duration}</div>
        <div className="video-hover-play" onClick={() => onPlay(video)}>
          ▶️
        </div>
      </div>

      {/* Video info */}
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-channel">{video.channel}</p>
        <div className="video-stats">
          {/* Menampilkan views, likes, dan tanggal upload */}
          <span>{video.views} views</span>
          <span>•</span>
          <span>{video.date}</span>
        </div>
      </div>
    </div>
  )
}

// ====================================================================
// KOMPONEN 5: VIDEO GRID - Grid yang menampilkan banyak video
// ====================================================================
// Fungsi: Menampilkan kumpulan video dalam format grid responsive
function VideoGrid({ onPlayVideo }) {
  // Data dummy - dalam aplikasi real, ini akan dari API/database
  const videos = [
    {
      id: 1,
      title: 'Belajar JavaScript ES6 Terbaru',
      channel: 'Code Master',
      thumbnail: '🎬',
      duration: '38:45',
      views: '125.4K',
      date: '2 hari yang lalu'
    },
    {
      id: 2,
      title: 'Web Design untuk Pemula',
      channel: 'Design Hub',
      thumbnail: '🎨',
      duration: '52:10',
      views: '87.2K',
      date: '4 hari yang lalu'
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      channel: 'Dev Bootcamp',
      thumbnail: '⚙️',
      duration: '1:15:30',
      views: '203.8K',
      date: '1 minggu yang lalu'
    },
    {
      id: 4,
      title: 'CSS Animation Tricks',
      channel: 'Creative Code',
      thumbnail: '✨',
      duration: '28:05',
      views: '95.6K',
      date: '3 hari yang lalu'
    },
    {
      id: 5,
      title: 'Database SQL untuk Developers',
      channel: 'Data Academy',
      thumbnail: '🗄️',
      duration: '1:05:20',
      views: '156.3K',
      date: '5 hari yang lalu'
    },
    {
      id: 6,
      title: 'DevOps dan Docker Fundamentals',
      channel: 'Cloud Masters',
      thumbnail: '☁️',
      duration: '1:32:15',
      views: '245.7K',
      date: '1 minggu yang lalu'
    }
  ]

  return (
    <div className="video-grid">
      {/* map() = loop array dan render setiap video dalam VideoCard */}
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onPlay={onPlayVideo} />
      ))}
    </div>
  )
}

// ====================================================================
// KOMPONEN 6: PLAYBACK MODAL - Modal untuk memutar video
// ====================================================================
// Fungsi: Menampilkan video player dalam modal ketika pengguna klik video
function PlaybackModal({ video, onClose }) {
  if (!video) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal content - jangan close saat user klik di sini */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-video">
          <video controls autoPlay>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="modal-info">
          <h2>{video.title}</h2>
          <div className="modal-stats">
            <span>👁️ {video.views} views</span>
            <span>⭐ 4.8 rating</span>
            <span>👤 {video.channel}</span>
          </div>
          <p className="modal-description">
            Video pembelajaran profesional tentang {video.title.toLowerCase()}. 
            Materi disusun secara sistematis untuk pemula hingga intermediate level.
            Dilengkapi dengan contoh kode dan project praktis.
          </p>
        </div>
      </div>
    </div>
  )
}

// ====================================================================
// KOMPONEN UTAMA: MyApp - Root component
// ====================================================================
// Fungsi: Menggabungkan semua komponen menjadi satu aplikasi streaming
export default function MyApp() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [playingVideo, setPlayingVideo] = useState(null)

  // Fungsi handle saat user klik tombol kategori
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    console.log('Filter kategori:', category)
  }

  // Fungsi handle saat user klik video untuk diputar
  const handlePlayVideo = (video) => {
    setPlayingVideo(video)
  }

  const handleCloseModal = () => {
    setPlayingVideo(null)
  }

  return (
    <div className="app">
      {/* Header dengan navigasi */}
      <Header />

      <div className="app-body">
        {/* Featured video section */}
        <section className="featured-section">
          <FeaturedVideo />
        </section>

        {/* Category filter */}
        <section className="filter-section">
          <h2 className="section-title">Kategori</h2>
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </section>

        {/* Video grid - menampilkan daftar video */}
        <section className="content-section">
          <h2 className="section-title">Video Populer</h2>
          <VideoGrid onPlayVideo={handlePlayVideo} />
        </section>

        {/* Playback modal - muncul saat video dipilih */}
        <PlaybackModal video={playingVideo} onClose={handleCloseModal} />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 StreamHub. Semua hak dilindungi.</p>
          <div className="footer-links">
            <a href="#">Tentang Kami</a>
            <a href="#">Privasi</a>
            <a href="#">Syarat & Ketentuan</a>
            <a href="#">Hubungi Kami</a>
          </div>
        </div>
      </footer>
    </div>
  )
}