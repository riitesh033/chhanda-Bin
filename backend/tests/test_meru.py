from app.services.meru import (
    generate_meru,
    binomial_coefficient,
    guru_distribution,
    meru_summary,
)


def test_generate_meru():
    result = generate_meru(5)

    assert result == [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
    ]


def test_binomial_coefficient():
    assert binomial_coefficient(4, 0) == 1
    assert binomial_coefficient(4, 1) == 4
    assert binomial_coefficient(4, 2) == 6
    assert binomial_coefficient(4, 3) == 4
    assert binomial_coefficient(4, 4) == 1


def test_guru_distribution():
    result = guru_distribution(4)

    counts = [
        item["pattern_count"]
        for item in result
    ]

    assert counts == [1, 4, 6, 4, 1]


def test_distribution_total():
    result = guru_distribution(5)

    total = sum(
        item["pattern_count"]
        for item in result
    )

    assert total == 2 ** 5


def test_meru_summary():
    result = meru_summary(4)

    assert result["syllable_positions"] == 4
    assert result["total_patterns"] == 16
    assert result["formula"] == "2^4"