<template>
    <UEmpty
        variant="naked"
        class="h-full"
        title="Nenum workspace aberto"
        description="Crie ou seleicone um diretório local para começar"
        :actions="[
            {
                label: 'Criar um novo workspace',
                icon: 'i-lucide-circle-plus',
                onClick: handleCreateWorkspace,
            },
            {
                label: 'Abrir um workspace existente',
                icon: 'i-lucide-folder-plus',
                onClick: handleOpenWorkspace,
            },
        ]"
    />
</template>

<script setup lang="ts">
const modalCreateWorkspace = useCreateWorkspaceModal();

const { create, open } = useWorkspaceStore();

async function handleCreateWorkspace() {
    try {
        const basePath = await pickFolder("Selecione a pasta do workspace");

        if (!basePath) return;

        const name = await getFolderName(basePath);
        const res = await modalCreateWorkspace({ name });

        if (!res) return;

        create(basePath, name);
    } catch (err) {
        console.error(err);
    }
}

async function handleOpenWorkspace() {
    try {
        const path = await pickFolder("Selecione a pasta do workspace");
        if (!path) return;

        open(path);
    } catch (err) {
        console.error(err);
    }
}
</script>
