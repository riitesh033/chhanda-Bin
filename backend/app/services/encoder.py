from typing import Dict


PATTERN_TO_BINARY: Dict[str, str] = {
    "L": "0",
    "G": "1",
}

BINARY_TO_PATTERN: Dict[str, str] = {
    "0": "L",
    "1": "G",
}


def validate_pattern(pattern: str) -> str:
    """
    Validate and normalize a Laghu/Guru pattern.
    """
    pattern = pattern.upper().replace(" ", "")

    if not pattern:
        raise ValueError("Pattern cannot be empty.")

    invalid = set(pattern) - {"L", "G"}

    if invalid:
        raise ValueError(
            f"Invalid symbols: {', '.join(sorted(invalid))}. "
            "Only L and G are allowed."
        )

    return pattern


def encode_pattern(pattern: str) -> dict:
    """
    Convert a Laghu/Guru pattern into binary and decimal representation.
    """

    pattern = validate_pattern(pattern)

    binary = "".join(PATTERN_TO_BINARY[symbol] for symbol in pattern)

    decimal = int(binary, 2)

    guru_count = pattern.count("G")
    laghu_count = pattern.count("L")

    return {
        "pattern": pattern,
        "binary": binary,
        "decimal": decimal,
        "length": len(pattern),
        "guru_count": guru_count,
        "laghu_count": laghu_count,
    }


def decode_binary(binary: str) -> dict:
    """
    Convert binary representation back into Laghu/Guru pattern.
    """

    binary = binary.strip()

    if not binary:
        raise ValueError("Binary value cannot be empty.")

    if any(bit not in {"0", "1"} for bit in binary):
        raise ValueError("Binary value can contain only 0 and 1.")

    pattern = "".join(BINARY_TO_PATTERN[bit] for bit in binary)

    decimal = int(binary, 2)

    return {
        "binary": binary,
        "pattern": pattern,
        "decimal": decimal,
        "length": len(binary),
        "guru_count": pattern.count("G"),
        "laghu_count": pattern.count("L"),
    }