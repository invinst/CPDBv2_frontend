deploy-staging:
	ansible-playbook ansible/site.yml -i ansible/staging --ask-pass --ask-sudo-pass
