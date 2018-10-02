# clever-tools

[![Build Status](https://travis-ci.org/CleverCloud/clever-tools.svg?branch=master)](https://travis-ci.org/CleverCloud/clever-tools)

Command Line Interface for Clever Cloud.

## Installation

The clever-tools CLI can be installed through many different channels depending on your system setup.

### Via npm

If you already have node/npm on your system, you can run:

```sh
npm install -g clever-tools
```

WARNING: ⚠ This only works for 1.0.0 and after but it is not released yet.

If you want to install our latest beta release, you can run:

```sh
npm install -g clever-tools@beta
```

### On GNU/Linux

#### Debian/Ubuntu (.deb)

If you are using a GNU/Linux distribution that uses `.deb` packages like Debian or Ubuntu, you can run:

```sh
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys "379CE192D401AB61"
echo "deb https://dl.bintray.com/clevercloud/deb stable main" | tee -a /etc/apt/sources.list
apt-get update
apt-get install clever-tools
```

NOTES:

* The `.deb` packages are hosted on Bintray (their GPG key is required to trust their signed packages).
* If you want access to the beta channel, you can use this in your `sources.list`:

```sh
echo "deb https://dl.bintray.com/clevercloud/deb unstable beta" | tee -a /etc/apt/sources.list
```

#### CentOS/Fedora (.rpm)

If you are using a GNU/Linux distribution that uses `.rpm` packages like CentOS or Fedora, you can run:

```sh
curl https://bintray.com/clevercloud/rpm/rpm > /etc/yum.repos.d/bintray-clevercloud-rpm.repo
echo "exclude=*beta*" >> /etc/yum.repos.d/bintray-clevercloud-rpm.repo
yum install clever-tools
```

NOTES:

* The `.rpm` packages are hosted on Bintray.
* If you want access to the beta channel, you can omit the second line which contains an exclude option.

#### Arch Linux

If you are using Arch Linux, the packages can be installed from AUR with this repo: [clever-tools-bin](https://aur.archlinux.org/packages/clever-tools-bin/).
If you don't know how to use this, you can run:

```sh
git clone https://aur.archlinux.org/clever-tools-bin.git clever-tools
cd clever-tools
makepkg -si
```

NOTES:

* If you want access to the beta channel, you can use this repo [clever-tools-bin-beta](https://aur.archlinux.org/packages/clever-tools-bin-beta/).

#### Other distributions (.tar.gz)

If you are using another GNU/Linux distribution, you can download a `.tar.gz` archive and extract the binary in your `PATH`:

```sh
curl https://clever-tools.cellar.services.clever-cloud.com/releases/latest/clever-tools-latest_linux.tar.gz
tar xvzf clever-tools-latest_linux.tar.gz
cp clever-tools-latest_linux/clever ~/.local/bin/
```

WARNING: ⚠ Before version 1.0.0, you will also need to copy `nodegit.node` file from the archive into your `PATH`.

NOTES:

* The packages are available on Clever Cloud's Cellar bucket: [clever-tools-latest_linux.tar.gz](https://clever-tools.cellar.services.clever-cloud.com/releases/latest/clever-tools-latest_linux.tar.gz).
* You can also retrieve any release (including beta) on this Cellar bucket by replacing `latest` (path and filename) with the version number you need.

### On MacOS

#### Using homebrew

If you are using MacOS and you have [homebrew](https://brew.sh) installed, you can run:

```sh
brew install CleverCloud/homebrew-tap/clever-tools
```

NOTES:

* If you want access to the beta channel, you can use `CleverCloud/homebrew-tap-beta/clever-tools` instead.

#### Using the `.tar.gz` archive

If you are using MacOS but you don't have [homebrew](https://brew.sh) installed, you can download a `.tar.gz` archive and extract the binary in your `PATH`:

```sh
curl https://clever-tools.cellar.services.clever-cloud.com/releases/latest/clever-tools-latest_macos.tar.gz
tar xvzf clever-tools-latest_linux.tar.gz
cp clever-tools-latest_linux/clever ~/.local/bin/
```

WARNING: ⚠ Before version 1.0.0, you will also need to copy `nodegit.node` file from the archive into your `PATH`.

NOTES:

* The packages are available on Clever Cloud's Cellar bucket: [clever-tools-latest_macos.tar.gz](https://clever-tools.cellar.services.clever-cloud.com/releases/latest/clever-tools-latest_macos.tar.gz).
* You can also retrieve any release (including beta) on this Cellar bucket by replacing `latest` (path and filename) with the version number you need.

### On Windows

#### Using chocolatey

If you are using Windows and you have [chocolatey](https://chocolatey.org) installed, you can run: 

```bash
choco sources add -n=clevercloud -s='https://api.bintray.com/nuget/clevercloud/nupkg'
choco install clever-tools
```

NOTES:

* If you want access to the beta channel, you can use `choco install --pre clever-tools` instead.

#### Using the `.zip` archive

If you are using Windows but you don't have [chocolatey](https://chocolatey.org) installed, you can download a `.zip` archive and extract the binary in your `PATH`.

WARNING: ⚠ Before version 1.0.0, you will also need to copy `nodegit.node` file from the archive into your `PATH`.

NOTES:

* The packages are available on Clever Cloud's Cellar bucket: [clever-tools-latest_win.tar.gz](https://clever-tools.cellar.services.clever-cloud.com/releases/latest/clever-tools-latest_win.zip).
* You can also retrieve any release (including beta) on this Cellar bucket by replacing `latest` (path and filename) with the version number you need.

## Enabling autocompletion

The clever-tools CLI comes with a comprehensive auto-completion system.
Some installation methods like `.deb` packages, `.rpm` packages or brew will try to enable it automatically.
If it does not work, try this for bash: 

```bash
clever --bash-autocomplete-script $(which clever) | sudo tee /usr/share/bash-completion/completions/clever
```

or this for zsh:

```bash
clever --zsh-autocomplete-script $(which clever) | sudo tee /usr/share/zsh/site-functions
```

## How to use

### Login

To use `clever-tools`, you have to login.

```sh
clever login
```

It will open a page in your browser. Copy the provided `token` and `secret`
codes in the CLI.

`clever login` tries to open a browser through `xdg-open` on GNU/Linux systems
(and in bash for windows). Make sure you have `xdg-utils` available as well as
a default browser set (or you can copy and paste the URL displayed in the
console.

### Create an application

```sh
clever create <name> --type <type> \
  [--region <region>] \
  [--org <organisation>] \
  [--alias <alias>]
```

Where `type` is one of:

- `docker`: for Docker-based applications
- `go`: for Go applications
- `gradle`: for applications launched with gradle
- `haskell`: for haskell applications
- `jar`: for applications deployed as standalone jar files
- `maven`: for applications launched with maven
- `node`: for node.js applications
- `php`: for PHP applications
- `play1`: for Play1 applications
- `play2`: for Play2 applications
- `python`: for python27 applications
- `ruby`: for ruby applications
- `rust`: for rust applications
- `sbt`: for applications launched with SBT
- `static-apache`: for static (HTML only) websites
- `war`: for applications deployed as war files

Where region is one of:

- `par` (for Paris)
- `mtl` (for Montreal)

`--org` allows you to chose the organisation in which your app is
created.

`--alias` allows you to deploy the same application in multiple environments on Clever Cloud (eg: production, testing, …)

### Link an existing application

```sh
clever link [--org <ORG-NAME>] <APP-NAME> [--alias <alias>]
```

Where `APP-NAME` is the name of your application, and `ORG-NAME` is the name
of the organisation it's in. You can specify a complete application id instead
of its name (in that case, `--org` can be omitted).

### Deploy an application

```sh
clever deploy [--alias <alias>]
```

`--alias` allows you to deploy your application several times on Clever Cloud
(eg: production, testing, …)

### Application status

```sh
clever status [--alias <alias>]
```

### Change application scalability

```sh
clever scale [--alias <alias>] [--min-flavor <minflavor>] [--max-flavor <maxflavor>] [--min-instances <mininstances>] [--max-instances <maxinstances>]
```

### Logs Drains

```sh
# create drain
clever drain create [--alias <alias>] <DRAIN-TYPE> <DRAIN-URL> [--username <username>] [--password <password>]
```

```sh
# list drains
clever drain [--alias <alias>]
```

```sh
# remove drain
clever drain remove [--alias <alias>] <DRAIN-ID>
```

Where `DRAIN-TYPE` is one of:

- `TCPSyslog`: for TCP syslog endpoint ;
- `UDPSyslog`: for UDP syslog endpoint ;
- `HTTP`: for TCP syslog endpoint (note that this endpoint has optional username/passwordparameters as HTTP Basic Authentication);
- `ElasticSearch`: for ElasticSearch endpoint (note that this endpoint requires username/password parameters as HTTP Basic Authentication).

ElasticSearch drains use the Elastic bulk API. To match this endpoint, specify `/_bulk` at the end of your ElasticSearch endpoint.

### Display help

You can display help about each command with `clever help`.

```sh
clever help
clever help deploy
```

## Examples

```sh
cd node_project
clever login
clever create "Node.js application" -t node -r mtl
clever deploy
```

## How to send feedback?

[Send us an email!](mailto:support@clever-cloud.com) or [submit an issue](https://github.com/CleverCloud/clever-tools/issues).

## Automated testing

This project uses Travis CI to launch unit tests and validate pull requests before they're merged: https://travis-ci.org/CleverCloud/clever-tools

## Automated releases

This project uses Jenkins to build binaries, package them and release them automatically on the various repositories.
If you want to know more or if you need to release a new version, please read [RELEASE.md](./RELEASE.md) carefully.
