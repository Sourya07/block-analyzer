# CryptoIntel Dashboard - Smart India Hackathon 2024

A comprehensive cryptocurrency intelligence platform designed for monitoring, analyzing, and investigating suspicious cryptocurrency addresses and activities. Built specifically for law enforcement and cybersecurity professionals to track cryptocurrency-related criminal activities.

## 🎯 Problem Statement

Cryptocurrency has become the de-facto currency for criminal activities in the modern age. This ranges from simple selling of banned items to grave crimes like money laundering, drug trafficking, and terrorism financing. The goal is to create a system for collecting cryptocurrency addresses via continuous scraping and associate them with suspect entities.

## ✨ Key Features

- **Real-time Dashboard**: Monitor cryptocurrency threats with live metrics and visualizations
- **Multi-source Data Integration**: Pulls data from BitcoinAbuse, ChainAbuse, and WalletExplorer APIs
- **Advanced Analytics**: Risk categorization, threat distribution analysis, and trend tracking
- **Investigation Management**: Create and manage investigations with address clustering
- **Automated Data Collection**: Scheduled scraping with autonomous data gathering
- **Export Capabilities**: Export filtered datasets in CSV and JSON formats
- **Global Threat Mapping**: Visualize threat distribution across countries
- **Risk-based Classification**: Categorize addresses by risk levels (LOW, MEDIUM, HIGH, CRITICAL)

## 🏗️ Architecture

### Backend Stack
- **Node.js + Express.js**: REST API server
- **PostgreSQL**: Primary database
- **Prisma ORM**: Database management and migrations
- **JWT Authentication**: Secure user authentication
- **Node-cron**: Automated scheduling
- **Axios**: External API integration

### Frontend Stack
- **React 18 + TypeScript**: Modern frontend framework
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Data visualization and charts
- **React Router**: Client-side routing
- **Lucide React**: Icon library

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v13+)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cryptointel-dashboard
```

2. **Setup Backend**
```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database URL and API keys

# Setup database
npx prisma generate
npx prisma migrate dev

# Start backend server
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install

# Start frontend development server
npm start
```

4. **Access the Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 📊 Dashboard Overview

The dashboard provides a comprehensive view of cryptocurrency threat intelligence:

### Main Metrics
- **Total Addresses**: 12,847 addresses tracked
- **High Risk Addresses**: 1,234 flagged addresses
- **Active Investigations**: 89 ongoing cases
- **Volume Tracked**: $2.4M in suspicious transactions

### Key Visualizations
- **Global Threat Distribution**: Map showing threat concentrations by country
- **Risk Categories Chart**: Breakdown of threat types (Money Laundering, Terrorism, etc.)
- **Recent Address Activity**: Real-time updates on new suspicious addresses
- **Investigation Status**: Overview of active cases and their progress

## 🔄 Data Sources

### Integrated APIs
1. **BitcoinAbuse**: Database of cryptocurrency addresses used in ransomware, blackmail, and other crimes
2. **ChainAbuse**: Community-driven database of cryptocurrency addresses involved in criminal activity
3. **WalletExplorer**: Bitcoin wallet identification and transaction analysis

### Data Categories
- **Money Laundering**: Financial crime detection
- **Drug Trafficking**: Narcotics-related transactions
- **Terrorism**: Terror financing identification
- **Ransomware**: Malware payment tracking
- **Fraud**: General fraudulent activities

## 🛡️ Security Features

- **Role-based Access Control**: Admin, Analyst, and Viewer roles
- **JWT Authentication**: Secure session management
- **Rate Limiting**: API protection against abuse
- **Data Encryption**: Sensitive information protection
- **Audit Trails**: Complete activity logging

## 📈 Analytics & Reporting

### Risk Assessment
- Automated risk level assignment (LOW, MEDIUM, HIGH, CRITICAL)
- Country-based threat analysis
- Category-wise risk distribution
- Temporal trend analysis

### Export Options
- **CSV Export**: Structured data for external analysis
- **JSON Export**: Machine-readable format with full metadata
- **Filtered Exports**: Custom dataset generation based on criteria

## 🔄 Automated Operations

### Scheduled Tasks
- **Hourly Data Sync**: Updates from all external sources
- **Daily Cleanup**: Log maintenance and data optimization
- **Weekly Analytics**: Trend analysis and reporting updates

### Data Processing Pipeline
1. **Collection**: Automated API calls to external sources
2. **Processing**: Data normalization and risk assessment
3. **Storage**: Structured database storage with indexing
4. **Analysis**: Real-time analytics and pattern recognition

## 🎯 Smart India Hackathon Compliance

This project addresses the hackathon requirements:

✅ **End-to-end System**: Complete solution from data collection to visualization  
✅ **Multi-source Integration**: BitcoinAbuse, ChainAbuse, WalletExplorer APIs  
✅ **Autonomous Operation**: Scheduled data collection and processing  
✅ **Analytical Frontend**: Rich dashboard with querying capabilities  
✅ **Export Functionality**: CSV and JSON data export  
✅ **Real-time Updates**: Live threat monitoring and alerting  

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cryptointel"

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# API Keys (obtain from respective services)
BITCOINABUSE_API_KEY=your-bitcoinabuse-key
CHAINABUSE_API_KEY=your-chainabuse-key
WALLETEXPLORER_API_KEY=your-walletexplorer-key
```

## 📝 API Documentation

### Core Endpoints

**Analytics**
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/trends` - Trend analysis data

**Addresses**
- `GET /api/addresses` - List addresses with filtering
- `POST /api/addresses` - Add new address
- `PUT /api/addresses/:id` - Update address
- `GET /api/addresses/stats/overview` - Address statistics

**Investigations**
- `GET /api/investigations` - List investigations
- `POST /api/investigations` - Create investigation

**Export**
- `GET /api/export/addresses/csv` - Export as CSV
- `GET /api/export/addresses/json` - Export as JSON

## 🚀 Deployment

### Production Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Build frontend: `npm run build`
4. Deploy backend with PM2 or Docker
5. Set up reverse proxy (Nginx)
6. Configure SSL certificates

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Future Enhancements

- **Machine Learning Integration**: AI-powered risk assessment
- **Blockchain Analysis**: On-chain transaction tracking
- **Real-time Alerts**: Push notifications for high-risk activities
- **Mobile Application**: iOS/Android companion app
- **Integration APIs**: Webhook support for external systems
- **Advanced Visualization**: 3D network graphs and interactive maps

## 👥 Team

- **Sourya Singh** - Full Stack Developer
- Email: singhsourya137@gmail.com

## 📄 License

This project is developed for Smart India Hackathon 2024. All rights reserved.

## 🆘 Support

For technical support or questions:
- Create an issue in the repository
- Contact: singhsourya137@gmail.com

---

**Built with ❤️ for Smart India Hackathon 2024**