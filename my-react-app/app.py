from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Dummy data for demonstration
teams = {
    'Y': {
        'name': 'Team Y',
        'members': [
            {'name': 'Alice Smith', 'role': 'Developer', 'image': 'placeholder-alice.png'},
            {'name': 'Bob Johnson', 'role': 'Designer', 'image': 'placeholder-bob.png'},
            {'name': 'Charlie Brown', 'role': 'Project Manager', 'image': 'placeholder-charlie.png'},
        ]
    }
}

@app.route('/')
def home():
    # Simple home page or redirect to a default team page
    return '<h1>Home Page</h1><p>Navigate to /team/Y/week/1 to see the team details.</p>'

@app.route('/team/<team_id>/week/<int:week_num>')
def team_details(team_id, week_num):
    team = teams.get(team_id)
    if not team:
        return "Team not found", 404

    return render_template('team_details.html', team=team, week_num=week_num)

@app.route('/add_member/<team_id>', methods=['POST'])
def add_member(team_id):
    team = teams.get(team_id)
    if not team:
        return "Team not found", 404

    name = request.form.get('name')
    role = request.form.get('role')
    image = request.form.get('image') # Optional

    if not name or not role:
        # Basic validation
        return "Name and Role are required", 400

    new_member = {'name': name, 'role': role, 'image': image if image else 'placeholder.png'}
    team['members'].append(new_member)

    # Redirect back to the team details page
    # Note: This simple implementation adds members persistently in memory
    # For a real app, you'd save to a database
    return redirect(url_for('team_details', team_id=team_id, week_num=request.form.get('week_num')))

if __name__ == '__main__':
    # In a real application, use a production-ready server like Gunicorn or uWSGI
    app.run(debug=True)
