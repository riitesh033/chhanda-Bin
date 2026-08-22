from pydantic import BaseModel, Field, model_validator


class PatternGenerationRequest(BaseModel):
    n: int = Field(..., ge=0, le=20)


class PatternFilterRequest(BaseModel):
    n: int = Field(..., ge=0, le=20)
    guru_count: int = Field(..., ge=0, le=20)

    @model_validator(mode="after")
    def validate_guru_count(self):
        if self.guru_count > self.n:
            raise ValueError(
                "guru_count cannot be greater than n."
            )

        return self


class RankPatternRequest(BaseModel):
    pattern: str = Field(..., min_length=1, max_length=20)


class UnrankPatternRequest(BaseModel):
    n: int = Field(..., ge=0, le=20)
    rank: int = Field(..., ge=1)