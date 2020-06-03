import React, { Component } from "react";
class ProfileGithub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: "8cdb31b9f428498c995c",
      clientSecret: "d541fa72a5de02ca6ad3e4cc87dcfb71de33e4fa",
      count: 5,
      sort: "created:asc",
      repos: [],
    };
  }

  componentDidMount = () => {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ repos: data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { repos } = this.state;

    let repoItems = [];
    if (repos.length > 0) {
      repoItems = repos.map((repo) => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars:{repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks:{repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

export default ProfileGithub;
