# BrainRidge Assessment Project

## Overview

This Angular-based web application is designed for managing financial transactions and user accounts. It provides a comprehensive platform for transaction logging, account creation, and user dashboard functionality.

## Features

- User Dashboard
- Transaction Management
- Account Creation
- Transaction Logs

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (latest LTS version)
- Angular CLI (latest version)
- Git
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Packages Used
1. `@angular/fire` (v19.0.0): Official Angular library for Firebase integration.
2. `firebase` (v11.2.0): Firebase SDK for JavaScript.
3. `@ng-bootstrap/ng-bootstrap` (v18.0.0): Angular-powered Bootstrap components.
4. `bootstrap` (v5.3.3): Popular CSS framework for responsive web design.
5. `bootstrap-icons` (v1.11.3): Official open-source SVG icon library for Bootstrap.
6. `rxjs` (v7.8.0): Reactive Extensions Library for JavaScript.
7. `uuid` (v11.0.5): For the creation of RFC4122 UUIDs.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vinnyab28/brainridge-assessment.git
   cd brainridge-assessment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Navigate to `http://localhost:4200/` in your browser.

## Project Structure

```
.
|____index.html
|____app/
| |____components/
| |____pages/
| |____shared/
| |____services/
| |____guards/
| |____models/
| |____enums/
|____environments/
|____assets/
|____styles/
```

## Key Components

- **Dashboard**: Main user interface for account overview
- **Transaction**: Manage and record financial transactions
- **Create Account**: User registration and account setup
- **Transaction Logs**: Historical record of all transactions
- **Layout**: Shared layout components (header, footer)

## Services

- `TransactionService`: Handles transaction-related operations
- `UserService`: Manages user data and authentication
- `ToastService`: Provides notification functionality

## Styling

The project uses SCSS for styling, with a main `styles.scss` file and component-specific style files.

## Project Strcuture Breakdown

### app/enums/
Stores TypeScript enums used throughout the application.
- `collections.ts`: Likely defines enum for different types of collections.
- `account-type.ts`: Enum for different types of accounts.

### app/shared/
Contains reusable components, directives, and pipes.
- `layout/`: A shared layout component, possibly used as a template for multiple pages.
- `toast/`: A reusable toast notification component.
- `button/`: A custom button component.

### app/models/
Defines TypeScript interfaces or classes for data models.
- `user.model.ts`: Defines the structure for user data.
- `transaction-log.model.ts`: Defines the structure for transaction log data.

### app/components/
Stores common UI components used across multiple pages.
- `footer/`: Footer component for the application.
- `header/`: Header component for the application.

### app/pages/
Contains components that represent full pages in the application.
- `transaction/`: Page for handling transactions.
- `transaction-logs/`: Page for displaying transaction logs.
- `page-not-found/`: 404 error page.
- `homepage/`: The main landing page.
- `dashboard/`: User dashboard page.
- `create-account/`: Page for account creation.

### app/services/
Houses services that handle data management and business logic.
- `transaction.service.ts`: Manages transaction-related operations.
- `toast.service.ts`: Handles toast notifications.
- `transaction-logs.service.ts`: Manages transaction log data.
- `user.service.ts`: Handles user-related operations.

### app/guards/
Contains route guards for protecting routes and resolving data.
- `user-form.guard.ts`: Likely protects user-related forms or routes.
- `users.resolver.ts`: Resolves user data before a route is activated.

## environments/
Stores environment-specific configuration files.
- `environment.ts`: Default environment settings.
- `environment.development.ts`: Development-specific environment settings.

## styles/
Contains additional style files.
- `brain-ridge.scss`: Custom styles specific to the BrainRidge project.

## assets/
Stores static assets used in the application.
- `logo-bw.svg`: The black and white logo file.

## Building for Production

To build the project for production, use:
```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Copyright Notice

All images, logos, and visual assets used in this project are the property of their respective copyright holders. No copyright infringement is intended. These materials are used solely for educational and developmental purposes.

### Disclaimer
- All visual assets are subject to the original owners' copyright
- Used under fair use principles
- No commercial exploitation intended

If you are the copyright owner of any asset and believe your rights have been infringed, please contact the repository owner immediately.

## Contact

My Website - [https://vineeth-prakash.vercel.app](https://vineeth-prakash.vercel.app)

Project Link: [https://github.com/vinnyab28/brainridge-assessment](https://github.com/vinnyab28/brainridge-assessment)

## References

- Bootstrap Documentation: [https://getbootstrap.com/](https://getbootstrap.com/)
- NG Bootstrap Documentation: [https://ng-bootstrap.github.io/#/home](https://ng-bootstrap.github.io/#/home)
- Firebase Documentation: [https://firebase.google.com/](https://firebase.google.com/)
- AngularFire Setup: [https://github.com/angular/angularfire/blob/HEAD/docs/install-and-setup.md](https://github.com/angular/angularfire/blob/HEAD/docs/install-and-setup.md)
- Firebase Realtime Database: [https://firebase.google.com/docs/database/web/read-and-write#web_14](https://firebase.google.com/docs/database/web/read-and-write#web_14)
- Perplexity AI: [https://www.perplexity.ai/](https://www.perplexity.ai/)
