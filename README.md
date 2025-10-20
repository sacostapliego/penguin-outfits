# AI Try-On Closet

A side-project that uses Google's Image Generation with Gemini (aka Nano Banana)

This document shows you how to run it, as there is no online deployment, and is meant to only run locally

## Prerequisites
- PostgreSQL
- FastAPI
- NodeJs
- Gemini API Key
- HuggingFace Access Key
- Python

## Overview
![Image of AI Closet](https://github.com/sacostapliego/portfolio/blob/main/src/components/assets/projects/full/ai-closet-full.png?raw=true "AI Try-On Closet")
----
#### General Use
This, Club Penguin inspired, virtual closet allows the user to upload their own image of themseleves or anyone along with any shirts, jackets, and pants. The user can than combine either a shirt/jacket and/or pants and generate it to see what it would look like.
#### 

## How to Run
Clone this repo, and create a .env file and place the following inside
```bash
DATABASE_URL=[your PostgreSQL connection string]
UPLOAD_DIR = [where your uploaded & generated photos to go, defaults to "uploads"]
HF_T2I_MODEL = [Which model to HF model to use]
HF_API_KEY = [HuggingFace Access Key, needs to read permissions]
GEMINI_API_KEY = [Google Gemini API Key, needs to have billing to use 2.5 flash]
```

#### Create a Database in PostgreSQL
```bash
CREATE DATABASE [your database name];
```
Get the connection string, and place that in the .env file in the DATABASE_URL

#### Install All Requirements for the Backend
To run install requirements
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

#### Run Simultaneously / Two Terminals

To run the backend
```bash
cd backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

To run the frontend
```bash
cd frontend
npm install
npm run dev
```




