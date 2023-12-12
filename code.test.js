//import("graphlib")

const fs = require('fs');
const jsc = require('jsverify');
const assert = require('assert');

//const Graph = require('@dagrejs/graphlib').Graph;
//const graphlib = require('@dagrejs/graphlib').alg;


eval(fs.readFileSync('code.js')+'');

/*var testGraph = new Graph();
testGraph.isDirected(false)
testGraph.setNode(0)
testGraph.hasNode(0)
testGraph.setNode(1)
testGraph.hasNode(1)
testGraph.setEdge(0,1,4)
testy123 = testGraph.edge(0,1)
testy123 = testGraph.edges()
testy321 = []
for(elem of testy123)
{
    testy321.push(testGraph.edge(elem))
}
console.log("Hi")*/


const test =
    jsc.forall("nat", function(int) {
        // Create a connected graph of v nodes, where v is a random integer generated above.
        nodeCount = Math.max(int,1)
        var graph = connectedGraph(nodeCount)
        //var libGraph = new Graph();
        //libGraph.isDirected(false)
        // Choose a random node in the graph to find a path to
        sourceNode = Math.floor(Math.random()*(nodeCount))
        // Modify the graph from a directional graph with edges of length one to a bidirectional graph
        // with edges of random length
        // Do this by checking for an edge, and then giving it and its correspondant the same random weight
        for(i = 0; i < graph.length; i++)
        {
            //libGraph.setNode(i)
            //libGraph.hasNode(i)
            for(j = 0; j < graph.length; j++)
            {
                if(graph[i][j] == 1)
                {
                    weight = (Math.floor(Math.random()*9))
                    graph[i][j] = Math.max(weight, 2)
                    graph[j][i] = graph[i][j]
                }
                //libGraph.setEdge(i, j, graph[i][i])
                //libGraph.setEdge(j, i, graph[j][i])
                
            }
        }
        // Store the results of each implementation
        results1 = allPairsShortestPaths(graph)
        // Results using external library, needs translated
        /*
        interimResults = graphlib.floydWarshall(libGraph, function(e) { return libGraph.edge(e.v, e.w); });
        results2 = []
        for(let k = 0; i < graph.length; i++)
        {
            results2.push([])
            for(let l = 0; j < graph.length;)
            {
                temp = 
                //if()
                results2[i].push(0)
            }
        }*/
        
        results2 = floydWarshall(graph)
        
        // If something is going wrong, it will yell at me so I can fix it
        if(JSON.stringify(results1) != JSON.stringify(results2))
        {
            console.log("Fail on test")
            console.log(results1)
            console.log(results2)
        }
        // Now compare the results of my function to a tested function
        return JSON.stringify(results1) == JSON.stringify(results2);
    });
jsc.assert(test, { tests: 1000 });

// Repurposed code from TSP Held Karp test code
// Graph with no nodes should return a graph with no distances
dm = [];
assert(JSON.stringify(allPairsShortestPaths(dm)) == JSON.stringify([]))

// If there is a node, whether it has a connection to itself or not, it should return a graph that
// only has its own distance at zero
dm = [[]];
assert(JSON.stringify(allPairsShortestPaths(dm)) == JSON.stringify([[0]]));

dm = [[0]];
assert(JSON.stringify(allPairsShortestPaths(dm)) == JSON.stringify([[0]]));

// Graph of no edges should return a graph of Infinities, except to themselves which should be zero.
// Infinity represents that there is no path between the nodes
dm = [[0,0,0],
      [0,0,0],
      [0,0,0]];
sol = [[0,Infinity,Infinity],
       [Infinity,0,Infinity],
       [Infinity,Infinity,0]];
assert(JSON.stringify(allPairsShortestPaths(dm)) == JSON.stringify(sol));

// Just calculated this next ones out
dm = [[0,1,4],
      [1,0,2],
      [4,2,0]];
sol = [[0,1,3],
       [1,0,2],
       [3,2,0]];
assert(JSON.stringify(allPairsShortestPaths(dm)) == JSON.stringify(sol));

dm = [[0,3,1],
      [3,0,2],
      [1,2,0]];
sol = [[0,3,1],
       [3,0,2],
       [1,2,0]];
assert(JSON.stringify(allPairsShortestPaths(dm)) == JSON.stringify(sol));

dm = [[0,4,1],
      [4,0,2],
      [1,2,0]];
sol = [[0,3,1],
       [3,0,2],
       [1,2,0]];
assert(JSON.stringify(allPairsShortestPaths(dm)) == JSON.stringify(sol));





// Graph generation code, from my wildcard project
function connectedGraph(v)
{
    // Populate an empty adjacency matrix the size of the graph
    graph = []
    for(i=0; i < v; i++)
    {
        graph.push([])
        for(j=0; j < v; j++)
        {
            graph[i].push(0)
        }
    }
    // Pick a random number of edges between the number of nodes minus one (the minimum number of edges
    // for a connected graph) and v^2 edges (the maximum number of edges for a connected graph)
    edges = Math.max(Math.floor(v*(Math.random()*(v))),v-1)
    // Pass to recursive constructor function
    return connectedGraph2(v, edges, graph)
}

function connectedGraph2(v, e, graph, connectedNodes = [0])
{
    // While there are more edges to be placed than unconnected nodes, place edge arbitrarily
    while(e > v-connectedNodes.length)
    {
        // Select a random connected node to generate an edge to another random node
        n1 = randomElementRange(connectedNodes.length)
        n1 = connectedNodes[n1]
        n2 = randomElementRange(v)
        unplaced = true
        while(unplaced)
        {
            // If this is an unplaced edge, place the edge
            if(graph[n1][n2] == 0)
            {
                graph[n1][n2] = 1
                e -=1    
                if(!connectedNodes.includes(n2))
                {
                    connectedNodes.push(n2)
                }
                unplaced = false
            // Else if there are remaining edges in this row that may be placeable, 
            // iterate to the next one
            } else if(n2 < graph[n1].length)
            {
                n2 += 1
            // Else if there is no remaining edges in this row that may be placeable, go to the next row
            } else if(n2 >= graph[n1].length-1)
            {
                if(n1 == graph.length - 1)
                {
                    n1 = 0
                    n2 = 0
                } else
                {
                    n2 = 0
                    n1 += 1
                }
            }
        }

    }
    
    // When there are only enough edges to connect each unconnected node, connect unconnected nodes to graph
    if(e > 0)
    {
        for(i = 0; i < v; i++)
        {
            if(!connectedNodes.includes(i))
            {
                n1 = Math.max(Math.floor(Math.random()*(connectedNodes.length))-1,0)
                n1 = connectedNodes[n1]
                graph[n1][i] = 1
                e -= 1
                connectedNodes.push(i)
            }   
        }
    }
    return graph
}

function randomElementRange(n) 
{
    return Math.floor(Math.random()*n)
}