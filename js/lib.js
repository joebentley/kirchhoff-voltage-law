/* globals $ Two MathJax */

var lib = {}

;(function (ns) {
  ns.Circuit = function (R1, R2, R3, V) {
    var self = {
      R1: R1,
      R2: R2,
      R3: R3,
      V: V,

      // Update circuit variables
      update: function () {
        self.I = self.V / (self.R1 + self.R2 + self.R3)
        self.V1 = self.I * self.R1
        self.V2 = self.I * self.R2
        self.V3 = self.I * self.R3

        return self
      }
    }

    self.update()

    return self
  }

  /* Draw the circuit onto the screen. Warning! This is a huge block of drawing code! */
  ns.drawCircuit = function (two) {
    // Add voltage source
    var source = { x: 100, y: 300, radius: 50, labelOffset: 30 }

    two.makeEllipse(source.x, source.y, source.radius, source.radius)

    // Add voltage source labels
    var textPadding = { x: 6, y: 10 }

    $(this.canvasContainer).append('<div class="label" id="labelSourceV">' +
      '\\(V_s = ' + this.circuit.V + ' V \\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelSourcePlus">\\(+\\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelSourceMinus">\\(-\\)</div>')

    $('#labelSourceV').css('left', source.x - textPadding.x - 25).css('top', source.y - textPadding.y)
    $('#labelSourcePlus').css('left', source.x - textPadding.x)
                         .css('top', source.y - source.labelOffset - textPadding.y)
    $('#labelSourceMinus').css('left', source.x - textPadding.x)
                          .css('top', source.y + source.labelOffset - textPadding.y)

    // Add circuit lines
    var distanceFromEdges = 100
    two.makeLine(source.x, source.y - source.radius, source.x, distanceFromEdges)
    two.makeLine(source.x, source.y + source.radius, source.x, two.height - distanceFromEdges)

    var circuitWidth = 250
    var circuitHeight = two.height - 2 * distanceFromEdges
    two.makeLine(source.x, distanceFromEdges, source.x + circuitWidth, distanceFromEdges)
    two.makeLine(source.x, two.height - distanceFromEdges,
                 source.x + circuitWidth, two.height - distanceFromEdges)

    two.makeLine(source.x + circuitWidth, distanceFromEdges,
                 source.x + circuitWidth, two.height - distanceFromEdges)

    // Draw the current direction
    var arrowPadding = 70
    var arrowStartX = source.x + arrowPadding
    var arrowEndX = source.x + circuitWidth - arrowPadding
    var arrowBody = two.makeLine(arrowStartX, distanceFromEdges, arrowEndX, distanceFromEdges)
    var arrowHead = two.makePath(arrowEndX - 10, distanceFromEdges - 5,
                                 arrowEndX, distanceFromEdges,
                                 arrowEndX - 10, distanceFromEdges + 5, true)

    arrowBody.linewidth = 2
    arrowHead.linewidth = 2
    arrowHead.fill = 'transparent'

    // Draw the current (I) label
    $(this.canvasContainer).append('<div class="label" id="labelI">' +
      '\\(I = ' + this.circuit.I.toPrecision(2) + ' A\\)</div>')

    $('#labelI').css('left', arrowStartX + (arrowEndX - arrowStartX) / 2 - textPadding.x - 30)
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
    $(this.canvasContainer).append('<div class="label" id="labelR1">\\(R_1 =\\)' +
      '<input ID="inputR1" type="text" class="inputR" value="' + this.circuit.R1 + '"/>' +
      '<div class="padTopOmega">\\(\\Omega\\)</div></div>')
    $(this.canvasContainer).append('<div class="label" id="labelR2">\\(R_2 =\\)' +
      '<input ID="inputR2" type="text" class="inputR" value="' + this.circuit.R2 + '"/>' +
      '<div class="padTopOmega">\\(\\Omega\\)</div></div>')
    $(this.canvasContainer).append('<div class="label" id="labelR3">\\(R_3 =\\)' +
      '<input ID="inputR3" type="text" class="inputR" value="' + this.circuit.R3 + '"/>' +
      '<div class="padTopOmega">\\(\\Omega\\)</div></div>')

    var resistorPadding = 90

    $('#labelR1').css('left', source.x + circuitWidth - 40 - textPadding.x - resistorPadding)
                 .css('top', distanceFromEdges + resistorSpacing - resistorOffset - textPadding.y)

    $('#labelR2').css('left', source.x + circuitWidth - 40 - textPadding.x - resistorPadding)
                 .css('top', distanceFromEdges + 2 * resistorSpacing - textPadding.y)

    $('#labelR3').css('left', source.x + circuitWidth - 40 - textPadding.x - resistorPadding)
                 .css('top', distanceFromEdges + 3 * resistorSpacing + resistorOffset - textPadding.y)

    // Add voltage labels
    $(this.canvasContainer).append('<div class="label" id="labelV1">' +
      '\\(V_1 = ' + this.circuit.V1.toPrecision(2) + 'V\\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelV2">' +
      '\\(V_2 = ' + this.circuit.V2.toPrecision(2) + 'V\\)</div>')
    $(this.canvasContainer).append('<div class="label" id="labelV3">' +
      '\\(V_3 = ' + this.circuit.V3.toPrecision(2) + 'V\\)</div>')

    var voltagePadding = 14

    $('#labelV1').css('left', source.x + circuitWidth + 60 - textPadding.x - voltagePadding)
                 .css('top', distanceFromEdges + resistorSpacing - resistorOffset - textPadding.y)

    $('#labelV2').css('left', source.x + circuitWidth + 60 - textPadding.x - voltagePadding)
                 .css('top', distanceFromEdges + 2 * resistorSpacing - textPadding.y)

    $('#labelV3').css('left', source.x + circuitWidth + 60 - textPadding.x - voltagePadding)
                 .css('top', distanceFromEdges + 3 * resistorSpacing + resistorOffset - textPadding.y)

    two.update()
  }

  /* Redraw changed labels */
  ns.redrawLabels = function () {
    // Edit MathJax elements directly to update values
    $('#labelV1 .mjx-mrow > .mjx-mn > .mjx-char').html(this.circuit.V1.toPrecision(2))
    $('#labelV2 .mjx-mrow > .mjx-mn > .mjx-char').html(this.circuit.V2.toPrecision(2))
    $('#labelV3 .mjx-mrow > .mjx-mn > .mjx-char').html(this.circuit.V3.toPrecision(2))
    $('#labelI .mjx-mrow > .mjx-mn > .mjx-char').html(this.circuit.I.toPrecision(2))
  }

  ns.runApp = function (canvasContainer) {
    this.canvasContainer = canvasContainer

    // Make a new circuit
    this.circuit = ns.Circuit(4, 5, 6, 5)

    var two = new Two({ width: 500, height: 600 }).appendTo(canvasContainer)
    ns.drawCircuit(two)

    var self = this
    // Setup event handlers for resistors
    $('#inputR1').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.R1 = Number(this.value)
        self.circuit.update()
        // Redraw labels
        ns.redrawLabels()
      }
    })
    $('#inputR2').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.R2 = Number(this.value)
        self.circuit.update()
        // Redraw labels
        ns.redrawLabels()
      }
    })
    $('#inputR3').on('input', function () {
      if (!isNaN(this.value) && this.value !== '') {
        self.circuit.R3 = Number(this.value)
        self.circuit.update()
        // Redraw labels
        ns.redrawLabels()
      }
    })
  }
})(lib)
