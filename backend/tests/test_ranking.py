from app.services.ranking import (
    rank_pattern,
    unrank_pattern,
)


def test_rank_pattern():
    expected = {
        1: "LLL",
        2: "GLL",
        3: "LGL",
        4: "GGL",
        5: "LLG",
        6: "GLG",
        7: "LGG",
        8: "GGG",
    }

    for rank, pattern in expected.items():
        result = rank_pattern(pattern)

        assert result["rank"] == rank
        assert result["zero_based_rank"] == rank - 1
        assert result["pattern"] == pattern


def test_unrank_pattern():
    expected = {
        1: "LLL",
        2: "GLL",
        3: "LGL",
        4: "GGL",
        5: "LLG",
        6: "GLG",
        7: "LGG",
        8: "GGG",
    }

    for rank, pattern in expected.items():
        result = unrank_pattern(3, rank)

        assert result["pattern"] == pattern
        assert result["rank"] == rank
        assert result["zero_based_rank"] == rank - 1


def test_rank_unrank_round_trip():
    patterns = [
        "LLL",
        "GLL",
        "LGL",
        "GGL",
        "LLG",
        "GLG",
        "LGG",
        "GGG",
    ]

    for pattern in patterns:
        ranked = rank_pattern(pattern)

        restored = unrank_pattern(
            len(pattern),
            ranked["rank"],
        )

        assert restored["pattern"] == pattern
        assert restored["rank"] == ranked["rank"]
        assert (
            restored["zero_based_rank"]
            == ranked["zero_based_rank"]
        )


def test_binary_and_decimal():
    result = rank_pattern("GGL")

    assert result["binary"] == "110"
    assert result["decimal"] == 6
    assert result["guru_count"] == 2
    assert result["laghu_count"] == 1