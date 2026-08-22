from app.services.generator import (
    generate_patterns,
    generate_pattern_details,
    generate_patterns_by_guru_count,
)


def test_generate_n0():
    assert generate_patterns(0) == [""]


def test_generate_n1():
    assert generate_patterns(1) == [
        "L",
        "G",
    ]


def test_generate_n2():
    assert generate_patterns(2) == [
        "LL",
        "GL",
        "LG",
        "GG",
    ]


def test_generate_n3():
    assert generate_patterns(3) == [
        "LLL",
        "GLL",
        "LGL",
        "GGL",
        "LLG",
        "GLG",
        "LGG",
        "GGG",
    ]


def test_pattern_count():
    for n in range(6):
        patterns = generate_patterns(n)

        assert len(patterns) == 2 ** n


def test_pattern_details():
    patterns = generate_pattern_details(2)

    assert len(patterns) == 4

    first = patterns[0]

    assert first["length"] == 2
    assert first["index"] == 0
    assert first["rank"] == 1
    assert first["zero_based_rank"] == 0
    assert first["pattern"] == "LL"
    assert first["binary"] == "00"
    assert first["decimal"] == 0
    assert first["laghu_count"] == 2
    assert first["guru_count"] == 0


def test_guru_filter():
    result = generate_patterns_by_guru_count(
        4,
        2,
    )

    assert len(result) == 6

    for item in result:
        assert item["guru_count"] == 2
        assert item["laghu_count"] == 2