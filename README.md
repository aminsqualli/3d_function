# 3d_function
Outil de simulation de fonction 3D

Voici le projet demandé dans le cadre du cours de programmation.

J'y ai implémenté plusieurs outils :
  - la possibilité de choisir si on veut un tracé plein ou en grille
  - la possibilité de choisir depuis le navigateur l'intervalle de définition de la fonction
  - la possibilité de choisir si on veut voir les axes apparaître ou non
  - des exemples de fonctions pré-définies
  - la possibilité de choisir la couleur du tracé de la fonction
  - la possibilité de faire tourner la fonction dynamiquement avec la souris
  - la possibilité de zoomer/dézoomer avec la molette de la souris
  - la possibilité d'entrer depuis le navigateur quelle fonction tracer
  
 Mon seul regret est de ne pas avoir pu autoriser la modificaiton de l'intervalle pour le tracé en grille. Il est par défaut fixé sur x∈[-10;10], y∈[-10;10].
 Cela s'explique par un problème de simulation de fonctions par Javascript que je n'ai pas su corriger. Certains intervalles provoquaient l'oubli de la simulation
 de certains points, ce qui s'avérait problématique car leur position est vitale pour tracer correctement et l'oubli provoquait des décalages. Ce problème ne 
 semble pas apparaître en choisissant l'intervalle x∈[-10;10], y∈[-10;10].
 
 Ce projet est constitué d'un document html (projet_3D_final.html), lié à 3 documents javascript (code_final_v3.js, graphic_manip.js et canvas_manip.js).
