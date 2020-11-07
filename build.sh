if [ "$BRANCH_NAME" = "develop" ]; then
    echo "Build development"
    npx ng build --c=development
else
    echo "Build production"
    npx ng build --c=production
fi
