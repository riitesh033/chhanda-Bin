from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import encoding, patterns, meru

app = FastAPI(
    title="Chhanda-Bin API",
    description="Pingala's Chandaḥśāstra as Binary Encoding and Combinatorial Generation",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "http://localhost:5174",
                   "https://chhanda-bin-frontend.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    encoding.router,
    prefix="/api/encoding",
    tags=["Encoding"],
)

app.include_router(
    patterns.router,
    prefix="/api/patterns",
    tags=["Patterns"],
)

app.include_router(
    meru.router,
    prefix="/api/meru",
    tags=["Meru-Prastara"],
)

@app.get("/")
def root():
    return {
        "message": "Welcome to Chhanda-Bin API"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }