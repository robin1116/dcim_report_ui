# simpleEye DCIM Admin System

## Overview

This is a web-based DCIM (Data Center Infrastructure Management) admin system called "simpleEye" that provides a modern, responsive interface for managing data center infrastructure. The application features a dual server setup with Flask/Gunicorn for Replit deployment and Express.js for development, designed to eventually integrate with a Spring Boot backend.

**Recent Update (2025-07-27)**: Completely removed dark theme and switched to light theme only. Eliminated page navigation flickering issues by removing theme toggle functionality and fixing all pages to light theme. Removed logo images from sidebar headers to simplify interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript with Bootstrap 5.3 for UI components
- **Design Pattern**: Modern admin dashboard with modular CSS architecture using CSS custom properties for theming
- **Responsive Design**: Mobile-first approach using Bootstrap's grid system and responsive utilities
- **Theme System**: Dynamic light/dark theme switching with system preference detection

### Backend Architecture
- **Current Setup**: Dual server setup - Flask (main.py) for Replit deployment and Express.js (server.js) for development
- **Primary Server**: Flask application serving static files and API endpoints (compatible with Replit workflow)
- **Development Server**: Node.js Express server with identical functionality for local development
- **API Structure**: RESTful endpoints following `/api/{resource}` pattern
- **Development Strategy**: Mock data implementation for frontend development, ready for backend integration

### Data Storage Solutions
- **Current State**: Mock data stored in JavaScript objects for development
- **Future Implementation**: Will integrate with Spring Boot backend using database persistence
- **Data Models**: User management with role-based access control structure already defined

## Key Components

### 1. Static File Server
- **Purpose**: Serves HTML, CSS, JavaScript, and asset files
- **Location**: `public/` directory contains all frontend assets
- **Rationale**: Simple static hosting for development with easy deployment transition

### 2. Theme Management System
- **Implementation**: CSS custom properties with JavaScript theme controller, redesigned for DCIM aesthetics
- **Current Theme**: Dark-first design with purple/blue neon accents, glassmorphism effects, and cyber-inspired styling
- **Features**: Neon glow effects, hologram animations, backdrop blur, gradient borders
- **Benefits**: Consistent with main DCIM dashboard, futuristic appearance, enhanced visual hierarchy

### 3. Admin Dashboard Interface
- **Components**: Sidebar navigation, responsive layouts, data tables with DataTables.js
- **Pages**: User management, port usage monitoring, alarm configuration
- **Design Language**: Modern flat design with glassmorphism effects and smooth animations

### 4. Authentication System (Planned)
- **Current State**: Login interface designed but not connected
- **Future Integration**: Will authenticate against Spring Boot backend
- **Security**: Role-based access control structure already defined in mock data

### 5. Notification System
- **Implementation**: Bootstrap-based toast notifications with custom wrapper
- **Features**: Multiple notification types, auto-dismiss, stacking support
- **Purpose**: User feedback for all system operations

## Data Flow

### Current Development Flow
1. Express server serves static files from `public/` directory
2. Frontend JavaScript makes AJAX requests to `/api/` endpoints
3. Mock API endpoints return hardcoded JSON data
4. Client-side JavaScript updates UI with received data

### Future Production Flow
1. Frontend remains unchanged
2. Express server proxies API requests to Spring Boot backend
3. Spring Boot handles authentication, authorization, and database operations
4. Data flows back through the same path with real data

## External Dependencies

### CDN Dependencies
- **Bootstrap 5.3.2**: UI framework for responsive design and components
- **DataTables 1.13.7**: Advanced table functionality with sorting, filtering, pagination
- **Font Awesome 6.5.1**: Icon library for consistent iconography
- **Pretendard Font**: Korean typography optimized font for consistent, modern interface design

### Node.js Dependencies
- **Express 5.1.0**: Web server framework for static file serving and API endpoints
- **Built-in Modules**: path, cors support built into Express 5.x

### Design Philosophy
- **Minimal Dependencies**: Prefer vanilla JavaScript over heavy frameworks
- **CDN-First**: Use CDN for stable libraries to improve loading performance
- **Progressive Enhancement**: Core functionality works without JavaScript

## Deployment Strategy

### Development Environment
- **Server**: Node.js Express server on port 5000 (configurable via PORT environment variable)
- **Static Assets**: Served directly from Express with appropriate MIME types
- **API Mocking**: Built-in mock endpoints for frontend development

### Production Considerations
- **Static Hosting**: Frontend can be deployed to any static hosting service
- **API Gateway**: Express server can act as API gateway/proxy to Spring Boot backend
- **Environment Variables**: PORT configuration for flexible deployment
- **Asset Optimization**: Ready for build process integration (minification, bundling)

### Integration Points
- **Backend API**: `/api/*` endpoints ready for Spring Boot integration
- **Authentication**: Login flow designed for JWT token-based authentication
- **CORS**: Already configured for cross-origin requests
- **Error Handling**: Consistent error response format established

The architecture prioritizes modularity and separation of concerns, making it easy to integrate with backend services while maintaining a polished, professional frontend experience.

## Recent Changes (2025-07-25)

### Menu Structure Reorganization
- **Updated Navigation**: Restructured sidebar menu to match user requirements:
  - **조회 보고서**: 전력조회 (powerInquiry.html), 장애조회 (faultInquiry.html)
  - **설정**: 장애임계치 설정 (alarmSetting.html)
  - **사용자관리**: 사용자관리 (adminsysuser.html)
- **Page Renaming**: Converted adminPortUsage.html to powerInquiry.html with updated content
- **New Pages**: Created faultInquiry.html based on existing templates
- **Breadcrumb Updates**: Modified navigation breadcrumbs to reflect new menu structure

### Login Page Enhancements  
- **Background Image**: Applied real datacenter images with blur effects for professional appearance
- **Glassmorphism Design**: Implemented transparent glass effects across all UI elements
- **Enhanced Input Fields**: Added backdrop-filter and translucent styling for modern look
- **Improved Visual Hierarchy**: Unified design language with proper contrast and readability

### DCIM Theme Implementation
- **Updated Color Palette**: Switched to dark theme with purple (#8b5cf6) and blue (#3b82f6) neon accents
- **Enhanced Visual Effects**: Added glassmorphism, backdrop blur, neon glow, and hologram sweep animations
- **Improved Cards**: Modern cards with gradient borders, enhanced shadows, and cyber-inspired styling
- **Navigation Updates**: Neon accent lines, enhanced hover effects, and improved visual feedback
- **Button Enhancements**: Added neon button variants with shimmer effects and glow animations
- **Background Integration**: Implemented cyber grid patterns and gradient backgrounds matching main dashboard

### Technical Improvements
- **Dual Server Setup**: Created Flask application (main.py) for Replit workflow compatibility
- **Fixed Port Conflicts**: Resolved deployment issues by implementing proper server management
- **Enhanced CSS Architecture**: Expanded theme system with DCIM-specific design tokens and animations
- **Font Standardization**: Applied Pretendard font across all project pages replacing Google Fonts (Inter/Poppins) for consistent Korean typography
- **Table Hover Effects**: Fixed data shifting issue on mouse hover by removing transform effects and optimizing hover animations
- **Menu Consistency**: Standardized "장애임계치 설정" menu naming across all pages for consistent navigation

### Recent Bug Fixes (2025-07-27)
- **Table Initialization**: Implemented lazy loading for voltage and power tables to resolve dual-header display issues
- **Navigation Consistency**: Updated all sidebar menus to use "장애임계치 설정" instead of "장애 설정" for uniform naming
- **Theme System Removal**: Completely removed dark theme functionality to eliminate page navigation flickering
  - Removed theme toggle buttons from all pages
  - Fixed CSS variables to light theme values in both modern-admin.css and themes.css
  - Removed theme-manager.js references from all HTML files
  - Simplified sidebar headers by removing logo SVG elements
- **Search Button Sizing**: Adjusted alarm threshold setting page search button to match other pages (col-2 width)
- **Menu Cleanup**: Removed fault level settings menu and page (alarmLevelConfig.html) from all pages as requested
- **Responsive Design Fix**: Fixed browser zoom issues (150%+) by converting fixed pixel widths to percentage-based responsive columns and adding media queries for optimal scaling
- **Filter Area Responsive Design**: Implemented comprehensive responsive design for alarm threshold page filter area with proper Bootstrap grid classes
- **Thymeleaf CDATA Escaping (2025-07-31)**: Applied CDATA escaping (`/*<![CDATA[*/` and `/*]]>*/`) to all JavaScript code containing double bracket arrays to prevent Thymeleaf parsing conflicts across all pages

### User Management Page Overhaul (2025-07-27)
- **Statistics Cards Removal**: Removed top statistics cards section for cleaner interface
- **Title Update**: Changed "관리자 목록" to "사용자 목록" for consistent terminology
- **Table Structure Simplification**: 
  - Removed "상태" (status) and "직업" (job) columns 
  - Changed "이메일" column to "비고" (notes/remarks) column
  - Updated table headers to match new structure: 아이디, 이름, 권한, 비고, 가입일, 작업
- **Modal Form Updates**: Updated registration and edit modals to use "비고" field instead of email
- **Mock Data Implementation**: Added 5 sample users with realistic Korean names and roles
- **CRUD Functionality**: Implemented complete Create, Read, Update, Delete operations with mock data
  - Add new users with validation
  - Edit existing user information and passwords
  - Delete users with confirmation dialog
  - Username duplicate checking
- **Action Buttons**: Added edit/delete buttons in table for each user with proper styling

### Complete Branding Update (2025-07-31)
- **System Rebranding**: Changed all references from "죽전 퍼시픽써니 DC" and "simpleEye" to "삼송 데이터센터"
  - Updated title tags in all HTML pages
  - Modified SVG logo text in login page
  - Changed breadcrumb navigation labels
  - Updated sidebar logo text across all admin pages
- **Thymeleaf Compatibility**: Applied CDATA escaping to JavaScript arrays to prevent template parsing issues
  - DataTables `order` and `lengthMenu` configurations
  - Chart.js/ECharts data arrays and color configurations
  - Export function column specifications

### API Integration with Axios (2025-07-31)
- **Flask Backend Enhancement**: Added comprehensive API endpoints for all application data:
  - `/api/users` - User management CRUD operations with realistic Korean user data
  - `/api/power-data` - Power monitoring data with realistic voltage, current, and power readings
  - `/api/fault-data` - Fault inquiry data with DCU, busway, and alarm information  
  - `/api/alarm-thresholds`, `/api/voltage-thresholds`, `/api/power-thresholds` - Alarm threshold configuration data
- **Frontend Axios Integration**: Updated all pages to use axios for HTTP requests:
  - User management page: Complete CRUD operations with API calls for create, update, delete operations
  - Power inquiry page: Real-time data loading from server endpoints
  - Fault inquiry page: Dynamic fault data retrieval with timestamp conversion
  - Alarm settings page: Three-tier threshold management (current, voltage, power)
- **Mock Data Generation**: Backend provides realistic sample data to simulate Spring Boot backend responses
- **Error Handling**: Implemented comprehensive error handling with user-friendly Korean messages
- **API Architecture**: Designed RESTful endpoints following Spring Boot conventions for seamless backend transition
- **Production Ready**: All API endpoints return JSON responses with proper error handling and success messages

### Offline Environment Support (2025-07-31)
- **Complete CDN to Local Migration**: Converted all external dependencies to local files for offline operation:
  - Bootstrap 5.3.2 CSS/JS downloaded to `public/lib/bootstrap/`
  - jQuery 3.7.1 downloaded to `public/lib/jquery/`
  - DataTables 1.13.7 with Bootstrap integration downloaded to `public/lib/datatables/`
  - FontAwesome 6.5.1 with webfonts downloaded to `public/lib/fontawesome/`
  - Chart.js 4.4.0 downloaded to `public/lib/chart/`
  - ECharts 5.4.3 downloaded to `public/lib/echarts/`
  - Axios 1.6.0 downloaded to `public/lib/axios/`
  - Export libraries (JSZip, XLSX, jsPDF) downloaded to `public/lib/datatables/`
- **FontAwesome Configuration**: Updated CSS paths to use local webfont files for proper icon display
- **Alarm Settings Bug Fix**: Added missing `loadInitialData()` function with proper API data loading
- **HTML Updates**: All pages (index, login, adminsysuser, powerInquiry, faultInquiry, alarmSetting) updated to use local library references
- **Offline Ready**: System now operates completely independently without internet connectivity requirements