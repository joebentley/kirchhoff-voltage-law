/* globals Two */

var lib = {}

;(function (ns) {
  /* Draw the circuit onto the screen. Warning! This is a huge block of drawing code! */
  ns.drawCircuit = function (two) {
    var textStyle = { 'family': 'Georgia', 'size': '15pt' }

    // Add voltage source
    var source = { x: 100, y: 300, radius: 50, labelOffset: 30 }

    two.makeEllipse(source.x, source.y, source.radius, source.radius)

    // Add voltage source labels
    two.scene.add(new Two.Text('V', source.x, source.y, textStyle))
    two.scene.add(new Two.Text('+', source.x, source.y - source.labelOffset, textStyle))
    two.scene.add(new Two.Text('-', source.x, source.y + source.labelOffset, textStyle))

    // Add circuit lines
    var distanceFromEdges = 100
    two.makeLine(source.x, source.y - source.radius, source.x, distanceFromEdges)
    two.makeLine(source.x, source.y + source.radius, source.x, two.height - distanceFromEdges)

    var circuitWidth = 200
    var circuitHeight = two.height - 2 * distanceFromEdges
    two.makeLine(source.x, distanceFromEdges, source.x + circuitWidth, distanceFromEdges)
    two.makeLine(source.x, two.height - distanceFromEdges,
                 source.x + circuitWidth, two.height - distanceFromEdges)

    two.makeLine(source.x + circuitWidth, distanceFromEdges,
                 source.x + circuitWidth, two.height - distanceFromEdges)

    // Draw the current direction
    var arrowStartX = source.x + 50
    var arrowEndX = source.x + circuitWidth - 50
    var arrowBody = two.makeLine(arrowStartX, distanceFromEdges, arrowEndX, distanceFromEdges)
    var arrowHead = two.makePath(arrowEndX - 10, distanceFromEdges - 5,
                                 arrowEndX, distanceFromEdges,
                                 arrowEndX - 10, distanceFromEdges + 5, true)

    arrowBody.linewidth = 2
    arrowHead.linewidth = 2
    arrowHead.fill = 'transparent'

    // Draw the current (I) label
    two.scene.add(new Two.Text('I', arrowStartX + (arrowEndX - arrowStartX) / 2,
      distanceFromEdges - 20, textStyle))

    // Draw the resistors
    var resistorSpacing = circuitHeight / 4
    var resistorWidth = 40
    var resistorHeight = 80
    var resistorOffset = 20

    two.makeRectangle(source.x + circuitWidth, distanceFromEdges + resistorSpacing - resistorOffset,
                      resistorWidth, resistorHeight)
    two.makeRectangle(source.x + circuitWidth, distanceFromEdges + 2 * resistorSpacing,
                      resistorWidth, resistorHeight)
    two.makeRectangle(source.x + circuitWidth, distanceFromEdges + 3 * resistorSpacing + resistorOffset,
                      resistorWidth, resistorHeight)

    // Add resistor labels
    two.scene.add(new Two.Text('R_1', source.x + circuitWidth - 40,
      distanceFromEdges + resistorSpacing - resistorOffset, textStyle))
    two.scene.add(new Two.Text('R_2', source.x + circuitWidth - 40,
      distanceFromEdges + 2 * resistorSpacing, textStyle))
    two.scene.add(new Two.Text('R_3', source.x + circuitWidth - 40,
      distanceFromEdges + 3 * resistorSpacing + resistorOffset, textStyle))

    // Add voltage labels
    two.scene.add(new Two.Text('V_1', source.x + circuitWidth + 60,
      distanceFromEdges + resistorSpacing - resistorOffset, textStyle))
    two.scene.add(new Two.Text('V_2', source.x + circuitWidth + 60,
      distanceFromEdges + 2 * resistorSpacing, textStyle))
    two.scene.add(new Two.Text('V_3', source.x + circuitWidth + 60,
      distanceFromEdges + 3 * resistorSpacing + resistorOffset, textStyle))

    two.update()
  }

  ns.runApp = function (canvasElem) {
    var two = new Two({ width: 400, height: 600 }).appendTo(canvasElem)

    ns.drawCircuit(two)

    two.update()
  }
})(lib)
