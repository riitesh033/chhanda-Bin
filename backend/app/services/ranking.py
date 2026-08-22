def validate_pattern(pattern: str) -> str:
    """
    Validate and normalize a Laghu/Guru pattern.

    Accepted symbols:
        L = Laghu
        G = Guru

    The empty pattern is allowed because it represents
    the unique pattern of length n = 0.
    """

    if not isinstance(pattern, str):
        raise ValueError(
            "Pattern must be a string."
        )

    pattern = pattern.upper().replace(" ", "")

    # Empty pattern is valid for n = 0.
    if not pattern:
        raise ValueError(
            "Pattern cannot be empty."
        )

    if any(
        symbol not in {"L", "G"}
        for symbol in pattern
    ):
        raise ValueError(
            "Pattern can contain only L and G."
        )

    return pattern


def rank_pattern(pattern: str) -> dict:
    """
    Calculate the rank of a Laghu/Guru pattern.

    Encoding:
        L = 0
        G = 1

    Pingala ranking treats the first syllable as
    the least-significant position.

    Rank is 1-based.

    The empty pattern has:
        length = 0
        binary = ""
        decimal = 0
        zero_based_rank = 0
        rank = 1
    """

    pattern = validate_pattern(pattern)

    n = len(pattern)

    zero_based_rank = 0

    for position, symbol in enumerate(pattern):
        if symbol == "G":
            zero_based_rank += 2 ** position

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
        "pattern": pattern,
        "length": n,
        "binary": binary,
        "decimal": decimal,
        "rank": zero_based_rank + 1,
        "zero_based_rank": zero_based_rank,
        "laghu_count": pattern.count("L"),
        "guru_count": pattern.count("G"),
    }


def unrank_pattern(
    n: int,
    rank: int,
) -> dict:
    """
    Convert a 1-based rank back into a Laghu/Guru pattern.

    Encoding:
        L = 0
        G = 1
    """

    if n < 0:
        raise ValueError(
            "n cannot be negative."
        )

    total_patterns = 2 ** n

    if rank < 1 or rank > total_patterns:
        raise ValueError(
            f"Rank must be between 1 and "
            f"{total_patterns} for n={n}."
        )

    zero_based_rank = rank - 1

    pattern = "".join(
        "G"
        if (zero_based_rank >> position) & 1
        else "L"
        for position in range(n)
    )

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
        "pattern": pattern,
        "length": n,
        "binary": binary,
        "decimal": decimal,
        "rank": rank,
        "zero_based_rank": zero_based_rank,
        "laghu_count": pattern.count("L"),
        "guru_count": pattern.count("G"),
    }