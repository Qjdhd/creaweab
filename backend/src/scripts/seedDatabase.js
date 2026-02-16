// ========================================================================
// FILE: seedDatabase.js
// FUNGSI: Populate MongoDB dengan data initial (seeding)
// PENJELASAN:
// - Script ini untuk initialize database dengan data testing
// - Jalankan: npm run seed
// - Hanya perlu dijalankan 1 kali (atau gunakan --force untuk reset)
// ========================================================================

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Video from '../models/Video.js'
import bcrypt from 'bcryptjs'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/creaweab'

/**
 * SEED DATA - Video dan User sample
 */
const seedVideos = [
  {
    title: 'Belajar JavaScript ES6 Terbaru',
    description: 'Tutorial lengkap JavaScript ES6 dengan contoh-contoh praktis dan mudah dipahami. Pelajari arrow functions, destructuring, async/await, dan fitur-fitur modern lainnya.',
    channel: 'Code Master',
    thumbnail: '🎬',
    duration: '38:45',
    category: 'Coding',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['javascript', 'es6', 'tutorial', 'programming'],
    isPublished: true,
    isFeatured: true
  },
  {
    title: 'Web Design untuk Pemula',
    description: 'Pelajari fundamental web design dari color theory hingga responsive layout. Panduan lengkap mencakup UI/UX, typography, color palette, dan layout principles.',
    channel: 'Design Hub',
    thumbnail: '🎨',
    duration: '52:10',
    category: 'Design',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['design', 'ui', 'ux', 'web design'],
    isPublished: true
  },
  {
    title: 'Node.js Backend Development',
    description: 'Buat backend profesional dengan Node.js dan Express.js. Lengkapi skill backend Anda dengan API development, authentication, database integration, dan deployment.',
    channel: 'Dev Bootcamp',
    thumbnail: '⚙️',
    duration: '1:15:30',
    category: 'Coding',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['nodejs', 'backend', 'express', 'api'],
    isPublished: true,
    isFeatured: true
  },
  {
    title: 'CSS Animation Tricks',
    description: 'Trik-trik CSS animation untuk membuat website lebih interaktif. Pelajari keyframes, transitions, transforms, dan create amazing animations dengan CSS pure.',
    channel: 'Creative Code',
    thumbnail: '✨',
    duration: '28:05',
    category: 'Design',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['css', 'animation', 'design'],
    isPublished: true
  },
  {
    title: 'Database SQL untuk Developers',
    description: 'Kuasai SQL dari dasar hingga query kompleks. Dari SELECT sederhana hingga JOIN kompleks, pahami SQL secara mendalam untuk efficient database management.',
    channel: 'Data Academy',
    thumbnail: '🗄️',
    duration: '1:05:20',
    category: 'Coding',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['sql', 'database', 'backend'],
    isPublished: true
  },
  {
    title: 'DevOps dan Docker Fundamentals',
    description: 'Pelajari containerization dan deployment dengan Docker. Docker, containers, images, compose, dan deploy aplikasi dengan confidence ke production.',
    channel: 'Cloud Masters',
    thumbnail: '☁️',
    duration: '1:32:15',
    category: 'Coding',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['docker', 'devops', 'cloud'],
    isPublished: true,
    isFeatured: true
  },
  {
    title: 'Digital Marketing Strategy 2026',
    description: 'Strategi marketing digital yang proven dan hasil-driven. SEO, social media marketing, content strategy, dan analytics untuk hasil maksimal.',
    channel: 'Marketing Pro',
    thumbnail: '📱',
    duration: '45:30',
    category: 'Marketing',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['marketing', 'seo', 'social-media'],
    isPublished: true
  },
  {
    title: 'Startup Mindset Workshop',
    description: 'Mindset dan skill yang perlu dimiliki entrepreneur modern. Dari idea validation hingga product market fit, semua yang perlu tahu untuk startup Anda sukses.',
    channel: 'Business Academy',
    thumbnail: '🚀',
    duration: '39:45',
    category: 'Business',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['startup', 'business', 'entrepreneurship'],
    isPublished: true
  }
]

const seedUsers = [
  {
    name: 'John Developer',
    email: 'john@example.com',
    password: 'password123', // Will be hashed
    avatar: '👨‍💻',
    bio: 'Full Stack Developer | React & Node.js Enthusiast',
    isVerified: true,
    isAdmin: false
  },
  {
    name: 'Sarah Designer',
    email: 'sarah@example.com',
    password: 'password123',
    avatar: '👩‍🎨',
    bio: 'UI/UX Designer | CSS Wizard',
    isVerified: true,
    isAdmin: false
  },
  {
    name: 'Mike Student',
    email: 'mike@example.com',
    password: 'password123',
    avatar: '👨‍🎓',
    bio: 'Learning web development | Always curious',
    isVerified: false,
    isAdmin: false
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123456',
    avatar: '👨‍💼',
    bio: 'Platform Administrator',
    isVerified: true,
    isAdmin: true
  }
]

/**
 * MAIN SEED FUNCTION
 */
async function seedDatabase() {
  try {
    // Connect ke MongoDB
    console.log('🔗 Connecting to MongoDB...')
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('✅ Connected to MongoDB')

    // Parse command line arguments
    const args = process.argv.slice(2)
    const shouldClear = args.includes('--force') || args.includes('--clear')

    if (shouldClear) {
      console.log('🗑️  Clearing existing data...')
      await User.deleteMany({})
      await Video.deleteMany({})
      console.log('✅ Data cleared')
    }

    // Check jika sudah ada data
    const existingUsers = await User.countDocuments()
    const existingVideos = await Video.countDocuments()

    if (existingUsers > 0 && existingVideos > 0 && !shouldClear) {
      console.log(`
⚠️  Database sudah ada data:
   • Users: ${existingUsers}
   • Videos: ${existingVideos}

💡 Untuk reset & reseed: npm run seed -- --force
      `)
      process.exit(0)
    }

    // ========== CREATE USERS ==========
    console.log('\n👤 Creating users...')
    const createdUsers = []
    
    for (const userData of seedUsers) {
      try {
        // Sanitize user data - hanya pass field yang defined di schema
        const sanitizedData = {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          avatar: userData.avatar || '👤',
          bio: userData.bio || '',
          isVerified: userData.isVerified || false,
          isAdmin: userData.isAdmin || false,
          isActive: true
        }
        
        console.log(`   Creating user: ${sanitizedData.email}`)
        const user = await User.create(sanitizedData)
        createdUsers.push(user)
        console.log(`   ✅ Created user: ${user.email}`)
      } catch (userError) {
        console.error(`   ❌ Error creating user ${userData.email}:`)
        console.error(`      Message: ${userError.message}`)
        if (userError.errors) {
          console.error(`      Validation errors:`, userError.errors)
        }
        throw userError
      }
    }

    // ========== CREATE VIDEOS ==========
    console.log('\n🎬 Creating videos...')
    const createdVideos = []
    
    for (let i = 0; i < seedVideos.length; i++) {
      try {
        const videoData = seedVideos[i]
        // Assign random creator (user)
        const creator = createdUsers[Math.floor(Math.random() * (createdUsers.length - 1))]
        
        const video = await Video.create({
          ...videoData,
          uploadedBy: creator._id,
          views: Math.floor(Math.random() * 300000),
          likes: Math.floor(Math.random() * 10000),
          rating: parseFloat((Math.random() * 5).toFixed(1))
        })
        
        createdVideos.push(video)
        console.log(`   ✅ Created video: "${video.title}"`)
      } catch (videoError) {
        console.error(`   ❌ Error creating video ${seedVideos[i].title}:`)
        console.error(`      Message: ${videoError.message}`)
        if (videoError.errors) {
          console.error(`      Validation errors:`, videoError.errors)
        }
        throw videoError
      }
    }

    // ========== ADD WATCHLIST & SUBSCRIPTIONS ==========
    console.log('\n📝 Setting up watchlist & subscriptions...')
    
    try {
      // User 1 (John) subscribe ke 3 channels
      if (createdUsers[0].subscribeChannel && typeof createdUsers[0].subscribeChannel === 'function') {
        await createdUsers[0].subscribeChannel(createdUsers[1]._id)
        await createdUsers[0].subscribeChannel(createdUsers[2]._id)
      }
      
      if (createdUsers[0].addToWatchlist && typeof createdUsers[0].addToWatchlist === 'function') {
        await createdUsers[0].addToWatchlist(createdVideos[0]._id)
        await createdUsers[0].addToWatchlist(createdVideos[2]._id)
      }
      console.log('   ✅ John subscribed & added videos to watchlist')

      // User 2 (Sarah) subscribe ke channels
      if (createdUsers[1].subscribeChannel && typeof createdUsers[1].subscribeChannel === 'function') {
        await createdUsers[1].subscribeChannel(createdUsers[0]._id)
      }
      
      if (createdUsers[1].addToWatchlist && typeof createdUsers[1].addToWatchlist === 'function') {
        await createdUsers[1].addToWatchlist(createdVideos[1]._id)
      }
      console.log('   ✅ Sarah subscribed & added videos to watchlist')
    } catch (subError) {
      console.warn('   ⚠️  Warning setting up subscriptions/watchlist:', subError.message)
      // Continue anyway - these are optional
    }

    // ========== SUMMARY ==========
    const finalUsers = await User.countDocuments()
    const finalVideos = await Video.countDocuments()

    console.log(`
╔════════════════════════════════════════════════════════╗
║          ✅ Database Seeding Complete! ✅             ║
╚════════════════════════════════════════════════════════╝

📊 Statistics:
   • Users Created: ${finalUsers}
   • Videos Created: ${finalVideos}

👤 Test Account Credentials:
   Email: john@example.com
   Password: password123
   
   Email: admin@example.com (Admin)
   Password: admin123456

🧪 Next Steps:
   1. Start backend: npm run dev
   2. Test API: http://localhost:5000/api/videos
   3. Check database: MongoDB Compass (GUI tool)
   
💡 Tips:
   • Gunakan MongoDB Compass untuk view database
   • Reset data: npm run seed -- --force
   • Update seed data di seedDatabase.js

    `)

    process.exit(0)
  } catch (error) {
    console.error(`
❌ Seeding Error:
${error.message}

${error.stack}

Troubleshooting:
1. Pastikan MongoDB sudah running
   - Windows: buka Command Prompt, ketik: mongod
   - Mac: brew services start mongodb-community
   
2. Cek MONGODB_URI di .env:
   MONGODB_URI=mongodb://localhost:27017/streamhub
   
3. Pastikan node_modules sudah install:
   npm install
   
4. Cek apakah ada error di email format atau validation lainnya
    `)
    process.exit(1)
  }
}

// Run seed function
seedDatabase()
