from pydantic import BaseModel, Field


class MeruRequest(BaseModel):
    rows: int = Field(..., ge=1, le=20)


class DistributionRequest(BaseModel):
    n: int = Field(..., ge=0, le=20)


class MeruSummaryRequest(BaseModel):
    n: int = Field(..., ge=0, le=20)