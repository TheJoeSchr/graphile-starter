#!/usr/bin/env bash

echo "copy local configs"

## SHOULD NOT NEEDED ANYMORE:
# ssh-agent should be forwared by vscode
# but sadly still is...

# Copy ssh creed from local home
# Needed for e.g. git push etc
mkdir -p $HOME/.ssh
cp -r /.home-localhost/.ssh/* $HOME/.ssh
chmod 600 $HOME/.ssh/*

# Copy gitconfig
rm $HOME/.gitconfig ; cp /.home-localhost/.gitconfig $HOME/
# Copy bashconfig
rm $HOME/.bashrc ; cp /.home-localhost/.bashrc $HOME/
# Copy tmux
rm $HOME/.tmux.conf ; cp /.home-localhost/.tmux.conf $HOME/
# Copy vimrc for vim & nvim
echo "Copying nvim/init.vim"
mkdir -p $HOME/.config/nvim
echo "$HOME/.vimrc $HOME/.config/nvim/init.vim" | xargs -n 1 cp -v /.home-localhost/.config/nvim/init.vim

# dos2unix dotfiles
echo "$HOME/.bashrc $HOME/.gitconfig $HOME/.ssh/config $HOME/.vimrc $HOME/.config/nvim/init.vim" | xargs -n 1 dos2unix

# Installs (n)vim plugins
nvim +'PlugInstall --sync' +qa true

# Installs tmux plugin manager
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

# Setting for the new UTF-8 terminal support in TMUX
touch /usr/share/locale/locale.alias;
sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8

export LC_CTYPE=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8
