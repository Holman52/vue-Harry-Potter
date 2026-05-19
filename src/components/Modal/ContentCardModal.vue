<template>
  <div class="modal-image">
    <img class="char__img border-1" :src="char.image ? char.image : '/src/assets/image/noAvatar.jpg'"
         :alt="char.name"/>
  </div>
  <div class="char__content">
    <h2 class="char__name">{{ char.name }}</h2>
    <div class="char__info">
      <div class="char__info-block">
        <div class="char__info-item">
          <p class="info-label">Gender</p>
          <p class="info-value">{{ char.gender || 'Unknown' }}</p>
        </div>
        <div class="char__info-item">
          <p class="info-label">Species</p>
          <p class="info-value">{{ char.species || 'Unknown' }}</p>
        </div>
      </div>
      <div class="char__info-block">
        <div class="char__info-item">
          <p class="info-label">Actor</p>
          <p class="info-value">{{ char.actor || 'Unknown' }}</p>
        </div>
        <div class="char__info-item">
          <p class="info-label">Status</p>
          <div class="status-badge" :class="char.alive ? 'status-alive': 'status-dead'">
            {{char.alive ? 'ALive' : 'Dead'}}
          </div>
        </div>
      </div>
      <div class="char__info-block" v-if="char.alternate_actors && char.alternate_actors.length">
        <div class="char__info-item">
          <p class="info-label">Alternate Actors</p>
          <p class="info-value">{{ char.alternate_actors.join(', ') }}</p>
        </div>
      </div>
      <div class="char__info-block" v-if="char.alternate_names && char.alternate_names.length">
        <div class="char__info-item">
          <p class="info-label">Alternate Names</p>
          <p class="info-value">{{ char.alternate_names.join(', ') }}</p>
        </div>
      </div>
      <div class="char__info-block">
        <div class="char__info-item">
          <p class="info-label">Ancestry</p>
          <p class="info-value">{{ char.ancestry || 'Unknown' }}</p>
        </div>
      </div>
      <div class="char__info-block">
        <div class="char__info-item">
          <p class="info-label">Date Of Birth</p>
          <p class="info-value">{{ char.dateOfBirth || 'Unknown' }}</p>
        </div>
      </div>
      <div class="char__info-block">
        <div class="char__info-item">
          <p class="info-label">House</p>
          <p class="info-value">{{ char.house || 'Unknown' }}</p>
        </div>
        <div class="char__info-item">
          <p class="info-label">Wizard</p>
          <div class="info-value">
            {{ char.wizard ? 'Yes' : 'No' }}
          </div>
        </div>
      </div>
      <div class="char__info-block">
        <div class="char__info-grid">
          <div class="char__info-item">
            <p class="info-label">Eye Colour</p>
            <p class="info-value">{{ char.eyeColour || 'Unknown' }}</p>
          </div>
          <div class="char__info-item">
            <p class="info-label">Hair Colour</p>
            <p class="info-value">{{ char.hairColour || 'Unknown' }}</p>
          </div>
        </div>
        <div class="char__info-item">
          <p class="info-label">Patronus</p>
          <div class="info-value">
            {{ char.patronus || 'Unknown' }}
          </div>
        </div>
      </div>
      <div class="char__info-block">
        <div class="char__info-item" v-if="char.hogwartsStaff">
          <p class="info-label">Hogwarts Staff</p>
          <p class="info-value">{{ char.hogwartsStaff ? 'Yes' : 'No' }}</p>
        </div>
        <div class="char__info-item" v-if="char.hogwartsStudent">
          <p class="info-label">Hogwarts Student</p>
          <div class="info-value">
            {{ char.hogwartsStudent ? 'Yes' : 'No'  }}
          </div>
        </div>
      </div>
      <h2 v-if="char.wand.wood">Wand</h2>
      <div class="char__info-grid" v-if="char.wand.wood">
        <div class="char__info-item">
          <p class="info-label">Wood</p>
          <p class="info-value">{{ char.wand.wood }}</p>
        </div>
        <div class="char__info-item">
          <p class="info-label">Core</p>
          <div class="info-value">
            {{char.wand.core  }}
          </div>
        </div>
        <div class="char__info-item">
          <p class="info-label">Length</p>
          <div class="info-value">
            {{char.wand.length  }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
 defineProps({
      char: {
        type: Object,
        required: true
      }
    })
</script>
<style scoped>
.char__info-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.modal-image {
  position: relative;
  overflow: hidden;
  width: auto;
  height: auto;
}
.border-1{
  border-radius: 16px;
}
.char__info-block {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

</style>