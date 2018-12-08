define([
    'base/js/namespace',
    'base/js/events'
    ], function(Jupyter, events) {

        // Adds a cell above current cell (will be top if no cells)
        var add_cell = function() {
        Jupyter.notebook.
        insert_cell_above('code').
        // Define default cell here
        set_text(`# Standard data science libraries
import pandas as pd
import numpy as np
from scipy import stats
import featuretools as ft

# Visualization
import matplotlib.pyplot as plt
import seaborn as sns
plt.style.use('bmh')

# Options for pandas
pd.options.display.max_columns = 20

# Display all cell outputs
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = 'all'
`);
Jupyter.notebook.select_prev();
Jupyter.notebook.execute_cell_and_select_below();
      };
      // Button to add default cell
      var defaultCellButton = function () {
          Jupyter.toolbar.add_buttons_group([
              Jupyter.keyboard_manager.actions.register ({
                  'help': 'Add default cell',
                  'icon' : 'fa-play-circle',
                  'handler': add_cell
              }, 'add-default-cell', 'Default cell')
          ])
      }
    // Run on start
    function load_ipython_extension() {
        // Add a default cell if there are no cells
        if (Jupyter.notebook.get_cells().length===1){
            add_cell();
        }
        defaultCellButton();
    }
    return {
        load_ipython_extension: load_ipython_extension
    };
});