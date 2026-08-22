from pydantic import BaseModel, Field


class RankRequest(BaseModel):
    pattern: str = Field(
        ...,
        min_length=1,
    )


class EncodeRequest(BaseModel):
    pattern: str = Field(
        ...,
        min_length=1,
    )


class UnrankRequest(BaseModel):
    n: int = Field(
        ...,
        ge=0,
        le=20,
    )

    rank: int = Field(
        ...,
        ge=0,
    )