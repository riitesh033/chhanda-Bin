from fastapi import APIRouter, HTTPException

from app.schemas.encoding import (
    EncodeRequest,
    RankRequest,
    UnrankRequest,
)

from app.services.ranking import (
    rank_pattern,
    unrank_pattern,
)


router = APIRouter()


@router.post("/encode")
def encode(request: EncodeRequest):
    try:
        return rank_pattern(request.pattern)

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )


@router.post("/rank")
def rank(request: RankRequest):
    try:
        return rank_pattern(request.pattern)

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )


@router.post("/unrank")
def unrank(request: UnrankRequest):
    try:
        return unrank_pattern(
            request.n,
            request.rank,
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )