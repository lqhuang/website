from flask import render_template, Blueprint

resume = Blueprint(
    'resume',
    __name__,
    template_folder='templates',  # Path for templates
    static_folder='static',  # Path for static files
    url_prefix='/resume')


@resume.route('/')
@resume.route('/en')
def resume_en(name=None):
    return render_template('resume_en.html', name=name)


@resume.route('/cn')
def resume_cn(name=None):
    return render_template('resume_cn.html', name=name)