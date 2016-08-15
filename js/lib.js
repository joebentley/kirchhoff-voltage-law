/* globals $ Two */

var lib = {}

;(function (ns) {
  /* Draw the circuit onto the screen. Warning! This is a huge block of drawing code! */
  ns.drawCircuit = function (two) {
    var textStyle = { 'family': 'Georgia', 'size': '15pt' }

    // Add voltage source
    var source = { x: 100, y: 300, radius: 50, labelOffset: 30 }

    two.makeEllipse(source.x, source.y, source.radius, source.radius)

    // Add voltage source labels
    var textPadding = { x: 6, y: 10 }

    $(this.canvasContainer).append('<div class="label" id="labelSourceV">\\(V\\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelSourcePlus">\\(+\\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelSourceMinus">\\(-\\)</div>')

    $('#labelSourceV').css('left', source.x - textPadding.x).css('top', source.y - textPadding.y)
    $('#labelSourcePlus').css('left', source.x - textPadding.x)
                         .css('top', source.y - source.labelOffset - textPadding.y)
    $('#labelSourceMinus').css('left', source.x - textPadding.x)
                          .css('top', source.y + source.labelOffset - textPadding.y)

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
    $(this.canvasContainer).append('<div class="label" id="labelI">\\(I\\)</div>')

    $('#labelI').css('left', arrowStartX + (arrowEndX - arrowStartX) / 2 - textPadding.x)
                .css('top', distanceFromEdges - 20 - textPadding.y)

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
    $(this.canvasContainer).append('<div class="label" id="labelR1">\\(R_1\\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelR2">\\(R_2\\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelR3">\\(R_3\\)</div>')

    $('#labelR1').css('left', source.x + circuitWidth - 40 - textPadding.x - 14)
                 .css('top', distanceFromEdges + resistorSpacing - resistorOffset - textPadding.y)

    $('#labelR2').css('left', source.x + circuitWidth - 40 - textPadding.x - 14)
                 .css('top', distanceFromEdges + 2 * resistorSpacing - textPadding.y)

    $('#labelR3').css('left', source.x + circuitWidth - 40 - textPadding.x - 14)
                 .css('top', distanceFromEdges + 3 * resistorSpacing + resistorOffset - textPadding.y)

    // Add voltage labels
    $(this.canvasContainer).append('<div class="label" id="labelV1">\\(V_1\\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelV2">\\(V_2\\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelV3">\\(V_3\\)</div>')

    $('#labelV1').css('left', source.x + circuitWidth + 60 - textPadding.x - 14)
                 .css('top', distanceFromEdges + resistorSpacing - resistorOffset - textPadding.y)

    $('#labelV2').css('left', source.x + circuitWidth + 60 - textPadding.x - 14)
                 .css('top', distanceFromEdges + 2 * resistorSpacing - textPadding.y)

    $('#labelV3').css('left', source.x + circuitWidth + 60 - textPadding.x - 14)
                 .css('top', distanceFromEdges + 3 * resistorSpacing + resistorOffset - textPadding.y)

    two.update()
  }

  ns.runApp = function (canvasContainer) {
    this.canvasContainer = canvasContainer

    var two = new Two({ width: 400, height: 600 }).appendTo(canvasContainer)
    ns.drawCircuit(two)
    two.update()
  }
})(lib)
