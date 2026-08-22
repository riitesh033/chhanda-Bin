from fastapi import APIRouter, HTTPException

from app.schemas.pattern import (
    PatternGenerationRequest,
    PatternFilterRequest,
    RankPatternRequest,
    UnrankPatternRequest,
)

from app.services.generator import (
    generate_pattern_details,
    generate_patterns_by_guru_count,
)

from app.services.ranking import (
    rank_pattern,
    unrank_pattern,
)


router = APIRouter()


@router.post("/generate")
def generate(request: PatternGenerationRequest):
    try:
        patterns = generate_pattern_details(request.n)

        return {
            "n": request.n,
            "total_patterns": len(patterns),
            "patterns": patterns,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )


@router.post("/filter")
def filter_patterns(
    request: PatternFilterRequest,
):
    try:
        patterns = generate_patterns_by_guru_count(
            request.n,
            request.guru_count,
        )

        return {
            "n": request.n,
            "guru_count": request.guru_count,
            "laghu_count": (
                request.n - request.guru_count
            ),
            "total_patterns": len(patterns),
            "patterns": patterns,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )


@router.post("/rank")
def rank(request: RankPatternRequest):
    try:
        return rank_pattern(request.pattern)

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )


@router.post("/unrank")
def unrank(request: UnrankPatternRequest):
    try:
        total_patterns = 2 ** request.n

        if request.rank > total_patterns:
            raise ValueError(
                f"Rank must be between 1 and "
                f"{total_patterns} for n={request.n}."
            )

        return unrank_pattern(
            request.n,
            request.rank,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )