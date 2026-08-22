import pytest
from fastapi.testclient import TestClient

from app.main import app

from app.services.ranking import (
    validate_pattern,
    rank_pattern,
    unrank_pattern,
)

from app.services.generator import (
    generate_patterns,
    generate_patterns_by_guru_count,
)

from app.services.meru import (
    generate_meru,
    binomial_coefficient,
)


client = TestClient(app)


# =========================================================
# RANKING VALIDATION
# =========================================================


def test_empty_pattern_is_invalid():
    with pytest.raises(ValueError):
        validate_pattern("")


def test_invalid_symbol_is_rejected():
    with pytest.raises(ValueError):
        validate_pattern("LGA")


def test_invalid_lowercase_symbol_is_normalized():
    assert validate_pattern("lgg") == "LGG"


def test_pattern_spaces_are_removed():
    assert validate_pattern("L G G") == "LGG"


def test_rank_invalid_pattern():
    with pytest.raises(ValueError):
        rank_pattern("LLXG")


# =========================================================
# UNRANK VALIDATION
# =========================================================


def test_unrank_negative_n():
    with pytest.raises(ValueError):
        unrank_pattern(-1, 1)


def test_unrank_rank_zero():
    with pytest.raises(ValueError):
        unrank_pattern(4, 0)


def test_unrank_rank_too_large():
    with pytest.raises(ValueError):
        unrank_pattern(4, 17)


def test_unrank_valid_boundary_ranks():
    assert unrank_pattern(4, 1)["pattern"] == "LLLL"

    assert unrank_pattern(4, 16)["pattern"] == "GGGG"


# =========================================================
# GENERATOR VALIDATION
# =========================================================


def test_generate_negative_n():
    with pytest.raises(ValueError):
        generate_patterns(-1)


def test_generate_zero_length():
    result = generate_patterns(0)

    assert result == [""]


def test_filter_negative_guru_count():
    with pytest.raises(ValueError):
        generate_patterns_by_guru_count(4, -1)


def test_filter_guru_count_greater_than_n():
    with pytest.raises(ValueError):
        generate_patterns_by_guru_count(4, 5)


def test_filter_all_laghu():
    result = generate_patterns_by_guru_count(4, 0)

    assert len(result) == 1
    assert result[0]["pattern"] == "LLLL"


def test_filter_all_guru():
    result = generate_patterns_by_guru_count(4, 4)

    assert len(result) == 1
    assert result[0]["pattern"] == "GGGG"


# =========================================================
# MERU VALIDATION
# =========================================================


def test_meru_zero_rows():
    with pytest.raises(ValueError):
        generate_meru(0)


def test_meru_negative_rows():
    with pytest.raises(ValueError):
        generate_meru(-1)


def test_binomial_invalid_n():
    with pytest.raises(ValueError):
        binomial_coefficient(-1, 0)


def test_binomial_invalid_k_returns_zero():
    assert binomial_coefficient(5, -1) == 0
    assert binomial_coefficient(5, 6) == 0


# =========================================================
# API VALIDATION
# =========================================================


def test_api_rank_missing_pattern():
    response = client.post(
        "/api/encoding/rank",
        json={},
    )

    assert response.status_code == 422


def test_api_rank_invalid_pattern():
    response = client.post(
        "/api/encoding/rank",
        json={
            "pattern": "XYZ"
        },
    )

    assert response.status_code == 400


def test_api_generate_negative_n():
    response = client.post(
        "/api/patterns/generate",
        json={
            "n": -1
        },
    )

    assert response.status_code == 422


def test_api_generate_n_too_large():
    response = client.post(
        "/api/patterns/generate",
        json={
            "n": 21
        },
    )

    assert response.status_code == 422


def test_api_filter_invalid_guru_count():
    response = client.post(
        "/api/patterns/filter",
        json={
            "n": 4,
            "guru_count": 5,
        },
    )

    assert response.status_code == 422


def test_api_meru_invalid_rows():
    response = client.post(
        "/api/meru/generate",
        json={
            "rows": 0
        },
    )

    assert response.status_code == 422