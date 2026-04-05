AI Ethics & Sustainability Prototype

Files
- index.html: page structure and node layout
- styles.css: visual design, map layout, zoom/focus behavior
- script.js: node logic, branching tutorial flow, feedback handling
- README.txt: quick usage notes

Current prototype logic
- Full-screen map by default
- The board is larger than the viewport so the player can pan around it
- Clicking an available node opens a centered tutorial card over the board, starting with the node title
- The first pass through a node stays in the centered card flow: title, action, then feedback
- After feedback, the player returns to the full map with the completed node and the newly available one(s)
- Completed nodes can be reopened to review their feedback in split-screen mode
- Node status uses color, while node type is now shown through shape
- Tutorial currently demonstrates:
  1) a quiz node,
  2) a story node,
  3) an information node,
  4) a final quiz node
- Only the funding path is active for now
- Resources now change lightly on quiz nodes and a bit more on open decision nodes

How to extend it
- Add or edit node content in script.js inside the `nodes` object
- To add a node to the map, create the HTML block in index.html and style its position in styles.css
- For future versions, resource impacts and flags can be added in script.js without changing the general interface structure
