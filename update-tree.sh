#!/bin/bash
# update-tree.sh — atualiza automaticamente a árvore de pastas no README

TREE_OUTPUT=$(tree -I '.git' --dirsfirst)

# Usa o awk pra substituir só o que tá entre os marcadores
awk -v tree="$TREE_OUTPUT" '
  /<!-- TREE_START -->/ { print; print "```"; print tree; print "```"; skip=1; next }
  /<!-- TREE_END -->/ { skip=0 }
  !skip
' README.md > README.tmp && mv README.tmp README.md

echo "README.md atualizado com a estrutura de pastas mais recente."