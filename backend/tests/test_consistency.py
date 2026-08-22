from app.services.ranking import (
    rank_pattern,
    unrank_pattern,
)

from app.services.generator import (
    generate_pattern_details,
    generate_patterns_by_guru_count,
)

from app.services.meru import (
    generate_meru,
    guru_distribution,
)


def test_rank_unrank_round_trip():
    """
    Every valid pattern should survive:

        pattern
            ↓
        rank
            ↓
        unrank
            ↓
        same pattern
    """

    for n in range(0, 8):
        patterns = generate_pattern_details(n)

        for item in patterns:
            result = unrank_pattern(
                n,
                item["rank"],
            )

            assert result["pattern"] == item["pattern"]
            assert result["rank"] == item["rank"]
            assert (
                result["zero_based_rank"]
                == item["zero_based_rank"]
            )


def test_unrank_rank_round_trip():
    """
    Every valid rank should survive:

        rank
          ↓
      unrank
          ↓
       pattern
          ↓
        rank
          ↓
      same rank
    """

    for n in range(0, 8):
        total = 2 ** n

        for rank in range(1, total + 1):
            pattern = unrank_pattern(
                n,
                rank,
            )["pattern"]

            if n == 0:
                assert pattern == ""
                assert rank == 1
                continue

            result = rank_pattern(pattern)

            assert result["rank"] == rank


def test_binary_encoding_consistency():
    """
    Verify:

        L = 0
        G = 1
    """

    for n in range(0, 8):
        patterns = generate_pattern_details(n)

        for item in patterns:
            expected_binary = "".join(
                "0" if symbol == "L" else "1"
                for symbol in item["pattern"]
            )

            assert item["binary"] == expected_binary

            expected_decimal = (
                int(expected_binary, 2)
                if expected_binary
                else 0
            )

            assert item["decimal"] == expected_decimal


def test_guru_distribution_matches_meru():
    """
    Verify that Guru/Laghu distribution
    matches the corresponding Meru row.
    """

    for n in range(0, 10):
        meru = generate_meru(n + 1)
        distribution = guru_distribution(n)

        counts = [
            item["pattern_count"]
            for item in distribution
        ]

        assert counts == meru[n]


def test_binomial_distribution_total():
    """
    Verify:

        Σ C(n,k) = 2ⁿ
    """

    for n in range(0, 12):
        distribution = guru_distribution(n)

        total = sum(
            item["pattern_count"]
            for item in distribution
        )

        assert total == 2 ** n


def test_filtered_patterns_match_binomial():
    """
    Verify that the number of generated patterns
    with exactly k Guru syllables equals C(n,k).
    """

    for n in range(0, 9):
        meru = generate_meru(n + 1)

        for guru_count in range(n + 1):
            patterns = generate_patterns_by_guru_count(
                n,
                guru_count,
            )

            assert len(patterns) == meru[n][guru_count]


def test_filtered_patterns_have_correct_guru_count():
    """
    Every pattern returned by the Guru-count filter
    must contain exactly the requested number of Guru
    syllables.
    """

    for n in range(0, 8):
        for guru_count in range(n + 1):
            patterns = generate_patterns_by_guru_count(
                n,
                guru_count,
            )

            for item in patterns:
                assert (
                    item["guru_count"]
                    == guru_count
                )

                assert (
                    item["laghu_count"]
                    == n - guru_count
                )


def test_meru_rows_follow_pascal_rule():
    """
    Verify Pascal's recurrence:

        C(n,k) = C(n-1,k-1) + C(n-1,k)
    """

    meru = generate_meru(12)

    for n in range(2, 12):
        for k in range(1, n):
            assert (
                meru[n][k]
                == meru[n - 1][k - 1]
                + meru[n - 1][k]
            )


def test_pattern_count_is_power_of_two():
    """
    The complete pattern space contains:

        2ⁿ

    patterns.
    """

    for n in range(0, 12):
        patterns = generate_pattern_details(n)

        assert len(patterns) == 2 ** n