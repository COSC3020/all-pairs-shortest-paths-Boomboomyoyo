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


# Response
This one was fairly simple. At first, I was going to try to reuse my Dijkstra's algorithm, but the pseudocode was basically all the code I would need, so I just rewrote this here. This was super simple.

## Runtime Analysis

The runtime of this algorithm is easy to analyze, as it is just a couple nested for loops. The first part, to set up the distance matrix has a runtime of $|V^2|$. The second part, to actually check for the shortest distance between each pair is $|V^3|$. So, the overall complexity is #\Theta\left(|V^3|\right)$.

## References
This code, which I grabbed for testing purposes, looks almost exactly like mine. I had to modify it so it would set the diagonal to 0, so it would match mine though.
https://codepal.ai/code-generator/query/i9E5s9LK/javascript-floyd-warshall-algorithm

I reused most of the testing code from my Dijkstra's exercise, which utilized my Wildcard's graph generation code.