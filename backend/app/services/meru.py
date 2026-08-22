from app.services.generator import (
    generate_patterns_by_guru_count,
)


def generate_meru(rows: int) -> list[list[int]]:
    """
    Generate Meru-Prastara / Pascal's triangle.

    Each row n contains:

        C(n, 0), C(n, 1), ..., C(n, n)

    Example:

        row 0 → [1]
        row 1 → [1, 1]
        row 2 → [1, 2, 1]
        row 3 → [1, 3, 3, 1]
    """

    if not isinstance(rows, int):
        raise ValueError(
            "rows must be an integer."
        )

    if rows < 1:
        raise ValueError(
            "Number of rows must be at least 1."
        )

    meru: list[list[int]] = []

    for n in range(rows):

        row: list[int] = []

        for k in range(n + 1):

            if k == 0 or k == n:
                value = 1

            else:
                value = (
                    meru[n - 1][k - 1]
                    + meru[n - 1][k]
                )

            row.append(value)

        meru.append(row)

    return meru


def binomial_coefficient(
    n: int,
    k: int,
) -> int:
    """
    Calculate C(n, k).

    Returns 0 when k is outside
    the valid range.
    """

    if not isinstance(n, int):
        raise ValueError(
            "n must be an integer."
        )

    if not isinstance(k, int):
        raise ValueError(
            "k must be an integer."
        )

    if n < 0:
        raise ValueError(
            "n cannot be negative."
        )

    if k < 0 or k > n:
        return 0

    # Symmetry:
    #
    # C(n,k) = C(n,n-k)
    #
    # This keeps the requested k small.

    k = min(k, n - k)

    if k == 0:
        return 1

    result = 1

    for i in range(1, k + 1):
        result = (
            result * (n - k + i)
        ) // i

    return result


def guru_distribution(
    n: int,
) -> list[dict]:
    """
    Show how many patterns contain exactly
    k Guru syllables.

    Mathematically:

        pattern_count = C(n, k)
    """

    if not isinstance(n, int):
        raise ValueError(
            "n must be an integer."
        )

    if n < 0:
        raise ValueError(
            "n cannot be negative."
        )

    result: list[dict] = []

    for k in range(n + 1):

        count = binomial_coefficient(
            n,
            k,
        )

        result.append(
            {
                "guru_count": k,
                "laghu_count": n - k,
                "pattern_count": count,
            }
        )

    return result


def meru_summary(
    n: int,
) -> dict:
    """
    Provide a computational summary for
    n syllable positions.
    """

    if not isinstance(n, int):
        raise ValueError(
            "n must be an integer."
        )

    if n < 0:
        raise ValueError(
            "n cannot be negative."
        )

    distribution = guru_distribution(n)

    return {
        "syllable_positions": n,
        "total_patterns": 2 ** n,
        "formula": f"2^{n}",
        "distribution": distribution,
    }


def verify_meru_against_patterns(
    n: int,
) -> list[dict]:
    """
    Verify Meru-Prastara against actual
    Laghu/Guru pattern generation.

    For every k:

        C(n,k)
        =
        number of generated patterns
        containing exactly k Guru syllables.

    Returns one verification record per k.
    """

    if not isinstance(n, int):
        raise ValueError(
            "n must be an integer."
        )

    if n < 0:
        raise ValueError(
            "n cannot be negative."
        )

    verification: list[dict] = []

    for k in range(n + 1):

        meru_count = binomial_coefficient(
            n,
            k,
        )

        patterns = (
            generate_patterns_by_guru_count(
                n,
                k,
            )
        )

        generated_count = len(patterns)

        verification.append(
            {
                "n": n,
                "guru_count": k,
                "laghu_count": n - k,
                "meru_count": meru_count,
                "generated_count": generated_count,
                "matches": (
                    meru_count == generated_count
                ),
            }
        )

    return verification