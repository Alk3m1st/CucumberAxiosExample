Feature: Is the web server alive?
    We want to have confidence the web server is able to serve traffic

    Scenario: Web Server returns a 200 status (OK)
        Given we visit the web server root domain
        When we send a HTTP request
        Then we should see a status code of 200