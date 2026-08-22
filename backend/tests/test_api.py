from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "healthy"
    }


def test_root():
    response = client.get("/")

    assert response.status_code == 200
    assert "message" in response.json()


def test_rank_pattern():
    response = client.post(
        "/api/encoding/rank",
        json={
            "pattern": "LGG"
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["pattern"] == "LGG"
    assert data["length"] == 3
    assert data["binary"] == "011"
    assert data["decimal"] == 3
    assert data["guru_count"] == 2
    assert data["laghu_count"] == 1


def test_generate_patterns():
    response = client.post(
        "/api/patterns/generate",
        json={
            "n": 3
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["n"] == 3
    assert data["total_patterns"] == 8
    assert len(data["patterns"]) == 8


def test_filter_patterns():
    response = client.post(
        "/api/patterns/filter",
        json={
            "n": 4,
            "guru_count": 2,
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["n"] == 4
    assert data["guru_count"] == 2
    assert data["laghu_count"] == 2

    # C(4, 2) = 6
    assert data["total_patterns"] == 6


def test_generate_meru():
    response = client.post(
        "/api/meru/generate",
        json={
            "rows": 5
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["rows"] == 5

    assert data["meru"] == [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
    ]


def test_meru_distribution():
    response = client.post(
        "/api/meru/distribution",
        json={
            "n": 4
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["n"] == 4
    assert data["total_patterns"] == 16

    counts = [
        item["pattern_count"]
        for item in data["distribution"]
    ]

    assert counts == [1, 4, 6, 4, 1]