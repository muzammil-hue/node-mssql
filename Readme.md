# NodeJS MSSQL App

## Overview
A simple Node.js application that connects to an MS SQL database, retrieves data, and serves it via RESTful APIs.

## Features
- Secure connection to MS SQL database.
- RESTful API to fetch user data.
- Automated deployment to Azure Web App via GitHub Actions.

## DB Configuration

CREATE TABLE Users (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50),
    Email NVARCHAR(50)
);



   
