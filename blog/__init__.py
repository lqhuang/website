from string import ascii_letters
from random import choice

from flask import Flask
from flask_bootstrap import Bootstrap

from .views import blog as blog_bp
from .views import pages as flatpages
from .resume.views import resume as resume_bp


def init_bp(app):
    app.register_blueprint(blog_bp)
    app.register_blueprint(resume_bp)


def init_flatpages(app):
    flatpages.init_app(app)


def init_bootstrap(app):
    Bootstrap(app)
    # print(app.extensions['bootstrap']['cdns'])
    # print(app.extensions['bootstrap']['cdns']['bootstrap'])


def create_app(config=None):
    app = Flask(
        __name__,
        instance_relative_config=False,
    )

    csrf_secret = ''.join((choice(ascii_letters) for _ in range(10)))
    secret_key = ''.join((choice(ascii_letters) for _ in range(10)))
    default_config = {
        'DEBUG': True,
        'CSRF_ENABLED': True,
        'CSRF_SECRET': csrf_secret,
        'SECRET_KEY': secret_key,
    }
    app.config.from_mapping(default_config)
    if config is None:
        try:
            app.config.from_pyfile('config.py')
        except FileNotFoundError as error:
            raise error
    else:
        app.config.from_object(config)

    app.url_map.strict_slashes = False

    # initial app instance with plugins
    init_bp(app)
    init_flatpages(app)
    init_bootstrap(app)

    if app.debug:
        # print(app.config)
        print(app.url_map)

    return app
