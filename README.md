[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13025255&assignment_repo_type=AssignmentRepo)
# All Pairs Shortest Paths

In the lectures, we've seen Dijkstra's algorithm for finding the shortest paths
from a given vertex to all other vertices in the graph. We've also covered the
Floyd-Warshall algorithm for finding the shortest path between all *pairs* of
vertices. It works as follows:

Given a graph $G = (V, E)$ with weighted edges:
- initialize a $|V|\times|V|$ matrix `dist` to $\infty$
- for each vertex $v \in V$, `dist[v][v] = 0`
- for each edge $(u,v) = e \in E$, `dist[u][v] = weight((u,v))`
- for each vertex $k\in V$:
    - for each vertex $i\in V$:
        - for each vertex $j\in V$:
            - `if dist[i][j] > dist[i][k] + dist[k][j]:`
              `dist[i][j] = dist[i][k] + dist[k][j]`

Implement this algorithm, starting with the template I provided in `code.js`.
The function takes a weighted graph graph and returns the matrix with the
distances, as described above. You can choose any data structures you like for
the implementation. I have not provided any test code, but you can base yours on
test code from other exercises.

## Runtime Analysis

What is the worst-case time complexity ($\Theta$) of the algorithm? Add your
answer, including your reasoning, to this markdown file.
