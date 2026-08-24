\# Chhanda-Bin



\## Pingala's Chandaḥśāstra as Binary Encoding and Combinatorial Generation



Chhanda-Bin is an educational and computational web application that explores the combinatorial principles of \*\*Pingala's Chandaḥśāstra\*\* through modern concepts of binary encoding, pattern generation, ranking, unranking, and Meru-Prastāra.



The project creates a conceptual bridge between \*\*Indian Knowledge Systems (IKS)\*\* and \*\*Computer Science (CS)\*\* by representing traditional Laghu/Guru metrical patterns using binary values:



\* \*\*Laghu (L)\*\* → `0`

\* \*\*Guru (G)\*\* → `1`



This representation allows traditional metrical enumeration to be studied using:



\* Binary representation

\* Combinatorics

\* Pattern generation

\* Ranking and unranking

\* Binomial coefficients

\* Pascal's Triangle / Meru-Prastāra

\* Algorithmic enumeration



\---



\## Table of Contents



\* \[Project Overview](#project-overview)

\* \[Objectives](#objectives)

\* \[Features](#features)

\* \[Conceptual Mapping](#conceptual-mapping)

\* \[How Binary Encoding Works](#how-binary-encoding-works)

\* \[Ranking and Unranking](#ranking-and-unranking)

\* \[Pattern Generation](#pattern-generation)

\* \[Meru-Prastāra](#meru-prastāra)

\* \[Architecture](#architecture)

\* \[Technology Stack](#technology-stack)

\* \[Project Structure](#project-structure)

\* \[API Reference](#api-reference)

\* \[Installation](#installation)

\* \[Running the Backend](#running-the-backend)

\* \[Running the Frontend](#running-the-frontend)

\* \[Testing](#testing)

\* \[Production Build](#production-build)

\* \[Validation and Error Handling](#validation-and-error-handling)

\* \[Academic Significance](#academic-significance)

\* \[Limitations](#limitations)

\* \[Future Improvements](#future-improvements)

\* \[License](#license)



\---



\# Project Overview



Pingala's \*\*Chandaḥśāstra\*\* is an important work associated with the study and classification of Sanskrit metres. One of its computationally interesting aspects is the systematic enumeration of possible arrangements of \*\*Laghu\*\* and \*\*Guru\*\* syllables.



Chhanda-Bin models these two alternatives computationally:



```text

Laghu (L) = 0

Guru  (G) = 1

```



Therefore, a sequence containing `n` positions has:



```text

2^n

```



possible Laghu/Guru combinations.



For example, for `n = 3`:



```text

LLL

LLG

LGL

LGG

GLL

GLG

GGL

GGG

```



Using the binary mapping:



```text

LLL → 000

LLG → 001

LGL → 010

LGG → 011

GLL → 100

GLG → 101

GGL → 110

GGG → 111

```



This demonstrates how a traditional combinatorial enumeration can be represented using a fundamental Computer Science concept: \*\*binary encoding\*\*.



\---



\# Objectives



The main objectives of Chhanda-Bin are:



1\. To demonstrate a computational interpretation of Laghu/Guru pattern enumeration.

2\. To map Laghu and Guru syllables to binary values.

3\. To generate all possible patterns of a specified length.

4\. To calculate the rank of a valid pattern.

5\. To reconstruct a pattern from its rank.

6\. To demonstrate the relationship between fixed Guru counts and binomial coefficients.

7\. To generate and visualize Meru-Prastāra.

8\. To provide an interactive educational interface for studying these concepts.

9\. To demonstrate how an Indian Knowledge System concept can be connected to modern Computer Science.



\---



\# Features



\## 1. Binary Encoding



The application represents:



```text

L → 0

G → 1

```



This provides a simple binary representation of each Laghu/Guru pattern.



\---



\## 2. Pattern Generation



The system can generate all possible Laghu/Guru patterns for a specified length.



For a pattern length `n`, the total number of patterns is:



```text

2^n

```



For example:



```text

n = 3



Total patterns = 2^3 = 8

```



\---



\## 3. Pattern Ranking



The application calculates the position or rank of a given Laghu/Guru pattern within the generated ordering.



The project uses a \*\*1-based rank\*\*, meaning the first pattern has rank `1`.



Example:



```text

LLL → 000 → Rank 1

LLG → 001 → Rank 2

LGL → 010 → Rank 3

```



\---



\## 4. Pattern Unranking



Unranking performs the reverse operation.



Given a valid rank, the system reconstructs the corresponding Laghu/Guru pattern.



Conceptually:



```text

Rank → Binary representation → Laghu/Guru pattern

```



For example:



```text

Rank 1 → 000 → LLL

Rank 2 → 001 → LLG

Rank 3 → 010 → LGL

```



\---



\## 5. Pattern Filtering



Generated patterns can be filtered according to their number of Guru syllables.



For example, for `n = 4`, patterns containing exactly two Guru syllables include:



```text

LLGG

LGLG

LGGL

GLLG

GLGL

GGLL

```



The number of such patterns is:



```text

C(4,2) = 6

```



\---



\## 6. Meru-Prastāra



The project also provides a computational representation of \*\*Meru-Prastāra\*\*, traditionally associated with the triangular arrangement of numbers corresponding to what is commonly known today as Pascal's Triangle.



For example:



```text

&#x20;       1

&#x20;      1 1

&#x20;     1 2 1

&#x20;    1 3 3 1

&#x20;   1 4 6 4 1

```



The values represent binomial coefficients:



```text

C(n,k)

```



These coefficients are useful for understanding the number of patterns having a fixed number of Guru syllables.



\---



\# Conceptual Mapping



| IKS Concept                 | Computer Science Concept |

| --------------------------- | ------------------------ |

| Laghu                       | Binary `0`               |

| Guru                        | Binary `1`               |

| Laghu/Guru sequence         | Binary string            |

| Enumeration of patterns     | Combinatorial generation |

| Number of possible patterns | `2^n`                    |

| Pattern position            | Ranking                  |

| Reverse position lookup     | Unranking                |

| Fixed Guru count            | Binomial coefficient     |

| Meru-Prastāra               | Pascal's Triangle        |

| Metrical pattern analysis   | Algorithmic processing   |



This mapping forms the central academic idea of the project.



\---



\# How Binary Encoding Works



Each syllable position has two possible states.



```text

L = 0

G = 1

```



Consider:



```text

Pattern = LGLG

```



Its binary representation is:



```text

0101

```



The corresponding decimal value is:



```text

0×2^3 + 1×2^2 + 0×2^1 + 1×2^0



= 0 + 4 + 0 + 1



= 5

```



The project uses this binary representation as the computational basis for representing and ordering patterns.



\---



\# Ranking and Unranking



\## Ranking



The ranking process converts a Laghu/Guru pattern into its position in the defined enumeration.



General process:



```text

Input pattern

&#x20;     ↓

Validate pattern

&#x20;     ↓

Convert L/G to 0/1

&#x20;     ↓

Interpret binary representation

&#x20;     ↓

Determine rank

&#x20;     ↓

Return result

```



The implementation uses a \*\*1-based rank\*\*.



\---



\## Unranking



The unranking process performs the reverse operation:



```text

Input rank

&#x20;     ↓

Validate rank

&#x20;     ↓

Determine corresponding binary value

&#x20;     ↓

Convert 0/1 to L/G

&#x20;     ↓

Return pattern

```



This demonstrates the important Computer Science concept of an invertible mapping between a finite set of patterns and their ordered indices.



\---



\# Pattern Generation



For a pattern length `n`, every position has two possible choices:



```text

L or G

```



Therefore:



```text

Total patterns = 2^n

```



A recursive generation strategy can be described as:



```text

generate(prefix, remaining\_length)



if remaining\_length == 0:

&#x20;   output prefix

else:

&#x20;   generate(prefix + "L", remaining\_length - 1)

&#x20;   generate(prefix + "G", remaining\_length - 1)

```



For:



```text

n = 2

```



the generated patterns are:



```text

LL

LG

GL

GG

```



\---



\# Meru-Prastāra



Meru-Prastāra is represented computationally using the recurrence relation of binomial coefficients.



The fundamental relation is:



```text

C(n,k) = C(n-1,k-1) + C(n-1,k)

```



with boundary values:



```text

C(n,0) = 1

C(n,n) = 1

```



The resulting structure is:



```text

1

1 1

1 2 1

1 3 3 1

1 4 6 4 1

```



For patterns of length `n`, the value:



```text

C(n,k)

```



represents the number of binary/Laghu-Guru patterns containing exactly `k` Guru positions.



For example:



```text

n = 4



0 Guru → C(4,0) = 1

1 Guru → C(4,1) = 4

2 Guru → C(4,2) = 6

3 Guru → C(4,3) = 4

4 Guru → C(4,4) = 1

```



The total is:



```text

1 + 4 + 6 + 4 + 1 = 16 = 2^4

```



This demonstrates the relationship between binary enumeration and binomial coefficients.



\---



\# Architecture



Chhanda-Bin follows a client-server architecture.



```text

┌──────────────────────────┐

│       React Frontend     │

│                          │

│  Pages / Components      │

│  Visualization           │

│  User Interaction        │

└────────────┬─────────────┘

&#x20;            │ HTTP / JSON

&#x20;            ▼

┌──────────────────────────┐

│       FastAPI Backend    │

│                          │

│  Encoding API            │

│  Pattern API             │

│  Meru API                │

└────────────┬─────────────┘

&#x20;            │

&#x20;            ▼

┌──────────────────────────┐

│      Python Algorithms   │

│                          │

│  Validation              │

│  Ranking                 │

│  Unranking               │

│  Generation              │

│  Combinatorial Analysis  │

└──────────────────────────┘

```



\---



\# Technology Stack



\## Frontend



\* React

\* TypeScript

\* Vite

\* Tailwind CSS

\* React Router

\* Axios

\* Lucide React

\* Recharts



\## Backend



\* Python

\* FastAPI

\* Pydantic

\* Uvicorn

\* Pytest



\## Development Tools



\* Git

\* GitHub

\* Visual Studio Code

\* npm

\* Python virtual environment



\---



\# Project Structure



A simplified project structure is:



```text

Chhanda-Bin/

│

├── backend/

│   ├── app/

│   │   ├── main.py

│   │   ├── routers/

│   │   │   ├── encoding.py

│   │   │   ├── patterns.py

│   │   │   └── meru.py

│   │   └── ...

│   │

│   ├── tests/

│   │   ├── test\_generator.py

│   │   └── test\_meru.py

│   │

│   ├── requirements.txt

│   └── ...

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── App.tsx

│   │   └── ...

│   ├── package.json

│   └── ...

│

├── README.md

└── .gitignore

```



\---



\# API Reference



The FastAPI backend exposes the following main operations.



\## Encoding



\### Rank Pattern



```text

POST /api/encoding/rank

```



Calculates the rank of a Laghu/Guru pattern.



Example conceptual input:



```json

{

&#x20; "pattern": "LGLG"

}

```



\---



\### Unrank Pattern



```text

POST /api/encoding/unrank

```



Converts a valid rank into the corresponding Laghu/Guru pattern.



Example conceptual input:



```json

{

&#x20; "rank": 6

}

```



\---



\# Pattern APIs



\### Generate Patterns



```text

POST /api/patterns/generate

```



Generates all Laghu/Guru patterns for a specified length.



\---



\### Filter Patterns



```text

POST /api/patterns/filter

```



Filters generated patterns according to their Guru count.



\---



\# Meru APIs



\### Generate Meru-Prastāra



```text

POST /api/meru/generate

```



Generates the required rows of the triangular structure.



\---



\### Guru Distribution



```text

POST /api/meru/distribution

```



Calculates the distribution of patterns according to the number of Guru syllables.



\---



\### Meru Summary



```text

POST /api/meru/summary

```



Provides summary information related to the generated Meru-Prastāra.



\---



\# Installation



\## Prerequisites



Install the following software before running the project:



\* Python 3.10 or later

\* Node.js

\* npm

\* Git



Verify the installations:



```bash

python --version

node --version

npm --version

git --version

```



\---



\# Backend Installation



Move into the backend directory:



```bash

cd backend

```



Create a virtual environment:



```bash

python -m venv venv

```



Activate it on Windows:



```bash

venv\\Scripts\\activate

```



Install the dependencies:



```bash

pip install -r requirements.txt

```



\---



\# Running the Backend



From the `backend` directory:



```bash

uvicorn app.main:app --reload

```



The API will normally be available at:



```text

http://localhost:8000

```



FastAPI's interactive API documentation is available at:



```text

http://localhost:8000/docs

```



\---



\# Frontend Installation



Open another terminal and move into the frontend directory:



```bash

cd frontend

```



Install dependencies:



```bash

npm install

```



\---



\# Running the Frontend



Start the development server:



```bash

npm run dev

```



Vite will display the local development URL in the terminal, normally:



```text

http://localhost:5173

```



The frontend communicates with the FastAPI backend through HTTP requests.



\---



\# Testing



The backend contains automated tests using \*\*Pytest\*\*.



From the backend directory:



```bash

pytest

```



The tests verify important functionality such as:



\* Pattern generation

\* Pattern counts

\* Meru-Prastāra generation

\* Combinatorial distribution

\* Input validation

\* Algorithmic behavior



A successful test run should report that the test cases passed.



\---



\# Production Build



Before deployment, the frontend should be built using:



```bash

npm run build

```



The build process generates an optimized production version of the React application.



The generated output is normally placed in:



```text

frontend/dist/

```



The backend can be tested separately using:



```bash

uvicorn app.main:app

```



\---



\# Validation and Error Handling



The backend validates Laghu/Guru patterns before processing them.



A valid pattern:



```text

LGLGLG

```



is accepted.



The following types of input are rejected:



```text

""

"ABC"

"LXG"

"123"

```



The validation process:



1\. Removes unnecessary spaces.

2\. Converts the pattern to uppercase.

3\. Checks that the pattern is not empty.

4\. Ensures that every symbol is either `L` or `G`.

5\. Returns an appropriate validation error when the input is invalid.



This prevents invalid data from reaching the computational algorithms.



\---



\# Complexity



\## Pattern Generation



There are:



```text

2^n

```



possible patterns of length `n`.



Therefore, generating all patterns requires:



```text

Time:  O(2^n)

Space: O(2^n)

```



when all generated patterns are stored.



\---



\## Binary Encoding



Encoding a pattern of length `n` requires examining its characters:



```text

Time: O(n)

```



\---



\## Pattern Validation



Validation examines every character:



```text

Time: O(n)

```



\---



\## Meru-Prastāra



Generating `r` rows of Pascal's Triangle requires computation proportional to the number of generated entries.



The number of entries is approximately:



```text

O(r^2)

```



for `r` rows.



\---



\# Limitations



The current project has several limitations:



1\. The application focuses on computational representation rather than complete Sanskrit prosody analysis.

2\. Laghu/Guru classification is represented abstractly as `L` and `G`.

3\. The application does not perform complete Sanskrit linguistic or phonetic analysis.

4\. Generating every possible pattern becomes expensive as `n` increases because the number of patterns grows exponentially.

5\. The current binary mapping is a computational model and should not be interpreted as claiming that ancient Indian scholars used modern binary notation.

6\. The project demonstrates a conceptual relationship between traditional combinatorial methods and modern Computer Science.



\---



\# Academic Significance



Chhanda-Bin demonstrates how an Indian Knowledge System concept can be studied using modern computational methods.



The project does not claim that Pingala's original work was identical to modern binary computing. Instead, it identifies a useful \*\*conceptual mapping\*\*:



```text

Traditional Concept

&#x20;       ↓

Laghu / Guru alternatives

&#x20;       ↓

Combinatorial enumeration

&#x20;       ↓

Modern computational representation

&#x20;       ↓

Binary strings and algorithms

```



This makes the project suitable for demonstrating the relationship between \*\*Indian Knowledge Systems and Computer Science\*\*.



The project also illustrates fundamental Computer Science concepts including:



\* Data representation

\* Recursion

\* Combinatorics

\* Binary numbers

\* Ranking and unranking

\* Algorithm design

\* API development

\* Visualization

\* Automated testing



\---



\# Future Improvements



Possible future improvements include:



1\. Add detailed Sanskrit prosody explanations.

2\. Add interactive demonstrations of the traditional metrical algorithms.

3\. Add support for larger pattern spaces using efficient algorithms.

4\. Add more advanced ranking and unranking techniques.

5\. Add downloadable reports.

6\. Add multilingual educational content.

7\. Add additional visualizations for combinatorial distributions.

8\. Add a database for storing generated patterns and learning material.

9\. Deploy the application publicly.

10\. Add automated frontend testing.

11\. Improve accessibility and mobile responsiveness.

12\. Add additional examples from the study of Sanskrit metres.



\---



\# Project Status



\*\*Status:\*\* Completed educational prototype



The project currently provides:



\* Binary Laghu/Guru representation

\* Pattern generation

\* Pattern ranking

\* Pattern unranking

\* Guru-count filtering

\* Meru-Prastāra generation

\* Combinatorial distribution

\* Interactive React frontend

\* FastAPI backend

\* Automated backend tests



\---



\# License



This project is developed as an educational and academic project.



If a specific open-source license is required for distribution, an appropriate license such as the MIT License can be added after confirming the project requirements.



\---



\# Conclusion



Chhanda-Bin presents a computational exploration of Pingala's Chandaḥśāstra by connecting the enumeration of Laghu/Guru patterns with binary representation and combinatorial algorithms.



The project demonstrates that traditional mathematical and prosodic ideas can be represented and explored using modern programming techniques while maintaining a distinction between \*\*historical concepts\*\* and their \*\*modern computational interpretation\*\*.



Through pattern generation, binary encoding, ranking, unranking, and Meru-Prastāra visualization, Chhanda-Bin provides an interactive example of how an Indian Knowledge System concept can be studied through Computer Science.



