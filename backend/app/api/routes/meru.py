from fastapi import APIRouter, HTTPException

from app.schemas.meru import (
    MeruRequest,
    DistributionRequest,
    MeruSummaryRequest,
)

from app.services.meru import (
    generate_meru,
    guru_distribution,
    meru_summary,
)


router = APIRouter()


@router.post("/generate")
def generate(request: MeruRequest):
    try:
        meru = generate_meru(request.rows)

        return {
            "rows": request.rows,
            "meru": meru,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )


@router.post("/distribution")
def distribution(request: DistributionRequest):
    try:
        data = guru_distribution(request.n)

        return {
            "n": request.n,
            "total_patterns": 2 ** request.n,
            "distribution": data,
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )


@router.post("/summary")
def summary(request: MeruSummaryRequest):
    try:
        return meru_summary(request.n)

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )