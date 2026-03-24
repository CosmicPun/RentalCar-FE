# Car Rental Backend API Documentation

This document provides a comprehensive overview of the Car Rental Backend API, including data types, endpoints, and access roles. This is designed for Next.js frontend integration with strict TypeScript typing.

## Authentication

All private endpoints require JWT token in Authorization header: `Bearer <token>`

### Roles
- `user`: Regular users can view public data and manage their own bookings
- `admin`: Administrators have full access to all resources

## Data Types

### User
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  telephone: string;
  createdAt: string;
}
```

### Car
```typescript
interface Car {
  _id: string;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  available: boolean;
  provider: Provider;
  picture: string;
  rentPrice: number;
  createdAt: string;
  updatedAt: string;
}
```

### Provider
```typescript
interface Provider {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  picture: string;
  dailyrate: number;
  cars?: Car[]; // Only populated in provider endpoints
}
```

### Booking
```typescript
interface Booking {
  _id: string;
  bookingDate: string;
  returnDate: string;
  totalCost: number;
  user: User;
  car: {
    _id: string;
    licensePlate: string;
    brand: string;
    model: string;
    provider: {
      _id: string;
      name: string;
      address: string;
      tel: string;
    };
  };
  provider: string; // Provider ID
  createdAt: string;
}
```

## API Endpoints

### Authentication

#### Register
- **Method**: POST
- **Endpoint**: `/api/auth/register`
- **Access**: Public
- **Request Body**:
```typescript
{
  name: string;
  email: string;
  telephone: string;
  password: string;
}
```
- **Response**: `{ success: boolean; token: string; data: User }`

#### Login
- **Method**: POST
- **Endpoint**: `/api/auth/login`
- **Access**: Public
- **Request Body**:
```typescript
{
  email: string;
  password: string;
}
```
- **Response**: `{ success: boolean; token: string; data: User }`

#### Logout
- **Method**: GET
- **Endpoint**: `/api/auth/logout`
- **Access**: Private (user, admin)
- **Response**: `{ success: boolean; data: {} }`

#### Get Current User
- **Method**: GET
- **Endpoint**: `/api/auth/me`
- **Access**: Private (user, admin)
- **Response**: `{ success: boolean; data: User }`

### Cars

#### Get All Cars
- **Method**: GET
- **Endpoint**: `/api/cars`
- **Access**: Public
- **Query Parameters**: select, sort, page, limit, [any car field filters]
- **Response**: `{ success: boolean; count: number; pagination: { next?: { page: number; limit: number }; prev?: { page: number; limit: number } }; data: Car[] }`

#### Get Single Car
- **Method**: GET
- **Endpoint**: `/api/cars/:id`
- **Access**: Public
- **Response**: `{ success: boolean; data: Car }`

#### Create Car
- **Method**: POST
- **Endpoint**: `/api/cars`
- **Access**: Private (admin)
- **Request Body**:
```typescript
{
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  transmission: 'Automatic' | 'Manual';
  fuelType?: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  provider: string; // Provider ID
  picture?: string;
  rentPrice: number;
}
```
- **Response**: `{ success: boolean; data: Car }`

#### Update Car
- **Method**: PUT
- **Endpoint**: `/api/cars/:id`
- **Access**: Private (admin)
- **Request Body**: Partial<Car>
- **Response**: `{ success: boolean; data: Car }`

#### Delete Car
- **Method**: DELETE
- **Endpoint**: `/api/cars/:id`
- **Access**: Private (admin)
- **Response**: `{ success: boolean; data: {} }`

### Providers

#### Get All Providers
- **Method**: GET
- **Endpoint**: `/api/providers`
- **Access**: Public
- **Query Parameters**: select, sort, page, limit, [any provider field filters]
- **Response**: `{ success: boolean; count: number; pagination: { next?: { page: number; limit: number }; prev?: { page: number; limit: number } }; data: Provider[] }`

#### Get Single Provider
- **Method**: GET
- **Endpoint**: `/api/providers/:id`
- **Access**: Public
- **Response**: `{ success: boolean; data: Provider }`

#### Create Provider
- **Method**: POST
- **Endpoint**: `/api/providers`
- **Access**: Private (admin)
- **Request Body**:
```typescript
{
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
  picture?: string;
  dailyrate?: number;
}
```
- **Response**: `{ success: boolean; data: Provider }`

#### Update Provider
- **Method**: PUT
- **Endpoint**: `/api/providers/:id`
- **Access**: Private (admin)
- **Request Body**: Partial<Provider>
- **Response**: `{ success: boolean; data: Provider }`

#### Delete Provider
- **Method**: DELETE
- **Endpoint**: `/api/providers/:id`
- **Access**: Private (admin)
- **Response**: `{ success: boolean; data: {} }`

### Bookings

#### Get All Bookings
- **Method**: GET
- **Endpoint**: `/api/bookings`
- **Access**: Private (user: own bookings, admin: all bookings)
- **Response**: `{ success: boolean; count: number; data: Booking[] }`

#### Get Single Booking
- **Method**: GET
- **Endpoint**: `/api/bookings/:id`
- **Access**: Private (user: own booking, admin: any booking)
- **Response**: `{ success: boolean; data: Booking }`

#### Create Booking
- **Method**: POST
- **Endpoint**: `/api/cars/:carId/bookings`
- **Access**: Private (user, admin)
- **Request Body**:
```typescript
{
  bookingDate: string; // ISO date string
  returnDate: string; // ISO date string
}
```
- **Response**: `{ success: boolean; data: Booking }`

#### Update Booking
- **Method**: PUT
- **Endpoint**: `/api/bookings/:id`
- **Access**: Private (user: own booking, admin: any booking)
- **Request Body**: Partial<Booking>
- **Response**: `{ success: boolean; data: Booking }`

#### Delete Booking
- **Method**: DELETE
- **Endpoint**: `/api/bookings/:id`
- **Access**: Private (user: own booking, admin: any booking)
- **Response**: `{ success: boolean; data: {} }`

## Error Response Format

All endpoints return errors in this format:
```typescript
{
  success: false;
  message: string;
}
```

## Usage in Next.js

### API Client Setup
```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const apiClient = {
  get: (endpoint: string) => fetch(`${API_BASE_URL}${endpoint}`).then(res => res.json()),
  post: (endpoint: string, data: any) => fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  // Add auth headers for private endpoints
  authGet: (endpoint: string, token: string) => fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.json()),
  // ... other methods
};
```

### Type-Safe API Calls
```typescript
// pages/cars.tsx
import { useEffect, useState } from 'react';
import { apiClient } from '../lib/api';

interface Car {
  _id: string;
  licensePlate: string;
  brand: string;
  model: string;
  // ... other fields
}

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/cars')
      .then((response: { success: boolean; data: Car[] }) => {
        if (response.success) {
          setCars(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // ... render cars
}
```