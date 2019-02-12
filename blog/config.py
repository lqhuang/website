CSRF_ENABLED = True
DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'pages'
FLATPAGES_MARKDOWN_EXTENSIONS = [
    'codehilite',
    'toc',
    'tables',
    'footnotes',
    # 'mdx_math',
]
# CSRF_SECRET = 'hard to guess'
# SECRET_KEY = 'hard to guess'