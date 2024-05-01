# Utilisation de l'image officielle Node.js 20
FROM node:20

# Créer le répertoire de travail et définir le répertoire de travail comme répertoire principal
WORKDIR /usr/src/app

# Copier les fichiers de configuration du package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Copier tous les autres fichiers de l'application
COPY . .
# Exposer le port 5000
EXPOSE 5000

# Commande pour exécuter l'application en mode développement
CMD ["npm", "run", "start:dev"]
