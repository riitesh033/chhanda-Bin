from app.services.ranking import rank_pattern


def generate_patterns(n: int) -> list[str]:
    """
    Generate all possible Laghu/Guru patterns of length n.

    Encoding:
        L = 0
        G = 1

    The first syllable is treated as the
    least-significant position.

    Therefore the generated ordering is
    consistent with rank_pattern() and
    unrank_pattern().
    """

    if not isinstance(n, int):
        raise ValueError(
            "n must be an integer."
        )

    if n < 0:
        raise ValueError(
            "n cannot be negative."
        )

    total_patterns = 2 ** n

    patterns = []

    for zero_based_rank in range(total_patterns):

        pattern = "".join(
            "G"
            if (zero_based_rank >> position) & 1
            else "L"
            for position in range(n)
        )

        patterns.append(pattern)

    return patterns


def analyze_pattern(
    pattern: str,
    index: int,
) -> dict:
    """
    Add computational information to a
    Laghu/Guru pattern.
    """

    binary = "".join(
        "0" if symbol == "L" else "1"
        for symbol in pattern
    )

    decimal = (
        int(binary, 2)
        if binary
        else 0
    )

    return {
        "length": len(pattern),
        "index": index,
        "rank": index + 1,
        "zero_based_rank": index,
        "pattern": pattern,
        "binary": binary,
        "decimal": decimal,
        "laghu_count": pattern.count("L"),
        "guru_count": pattern.count("G"),
    }


def generate_pattern_details(
    n: int,
) -> list[dict]:
    """
    Generate all patterns with their
    computational details.
    """

    patterns = generate_patterns(n)

    return [
        analyze_pattern(
            pattern,
            index,
        )
        for index, pattern in enumerate(patterns)
    ]


def generate_patterns_by_guru_count(
    n: int,
    guru_count: int,
) -> list[dict]:
    """
    Generate all patterns of length n
    containing exactly guru_count Guru syllables.

    The returned patterns retain their global
    Pingala rank within the complete pattern space.
    """

    if not isinstance(n, int):
        raise ValueError(
            "n must be an integer."
        )

    if n < 0:
        raise ValueError(
            "n cannot be negative."
        )

    if not isinstance(guru_count, int):
        raise ValueError(
            "guru_count must be an integer."
        )

    if guru_count < 0 or guru_count > n:
        raise ValueError(
            "guru_count must be between 0 and n."
        )

    patterns = generate_patterns(n)

    result = []

    for pattern in patterns:

        if pattern.count("G") != guru_count:
            continue

        # n = 0 has one valid mathematical pattern:
        # the empty pattern "".
        #
        # rank_pattern("") intentionally remains invalid
        # because an empty user-entered pattern is invalid.
        if pattern == "":
            result.append(
                {
                    "pattern": "",
                    "length": 0,
                    "rank": 1,
                    "zero_based_rank": 0,
                    "binary": "",
                    "decimal": 0,
                    "laghu_count": 0,
                    "guru_count": 0,
                }
            )

            continue

        ranking = rank_pattern(pattern)

        result.append(
            {
                "pattern": pattern,
                "length": len(pattern),
                "rank": ranking["rank"],
                "zero_based_rank": (
                    ranking["zero_based_rank"]
                ),
                "binary": ranking["binary"],
                "decimal": ranking["decimal"],
                "laghu_count": ranking["laghu_count"],
                "guru_count": ranking["guru_count"],
            }
        )

    return result