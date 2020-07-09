'''  import all the routes in all the files inside routes directory. '''
import os
import glob
__all__ = [os.path.basename(f)[:-3]
    for f in glob.glob(os.path.dirname(__file__) + "/*.py")]