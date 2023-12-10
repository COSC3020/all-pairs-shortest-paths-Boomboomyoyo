function allPairsShortestPaths(graph) {
    dist = []
    for(i = 0; i < graph.length; i++)
    {
        dist.push([])
        for(j = 0; j < graph.length; j++)
        {
            if(i == j)
            {
                dist[i].push(0)
            } else if(graph[i][j] > 0)
            {
                dist[i].push(graph[i][j])
            } else
            {
                dist[i].push(Infinity)
            }
        }
    }
    for(k = 0; k < graph.length; k++)
    {
        for(i = 0; i < graph.length; i++)
        {
            for(j = 0; j < graph.length; j++)
            {
                if(dist[i][j] > dist[i][k] + dist[k][j])
                {
                    dist[i][j] = dist[i][k] + dist[k][j]
                }
            }
        }
    }
    return dist;
}


function floydWarshall(graph) {
    const n = graph.length;
    const dist = [...graph];

    // Initialize the distance matrix with the graph values
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (dist[i][j] === 0 && i !== j) {
                dist[i][j] = Infinity;
            } else if (i == j)
            {
                dist[i][j] = 0
            }
        }
    }

    // Perform the Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    return dist;
}



/*console.log(allPairsShortestPaths([
    [0,2,3,4,1],
    [1,0,1,4,5],
    [1,2,0,1,1],
    [1,2,3,0,5],
    [1,2,3,4,0]]))*/
/*console.log(floydWarshall(
    [ [ 0, 8 ], [ 8, 7 ] ]))
console.log(allPairsShortestPaths(
    [ [ 0, 8 ], [ 8, 7 ] ]))*/