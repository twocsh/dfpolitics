export default class Mode1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Mode1' });
        this.draggingSkill = null;
        this.skillSlots = new Map();
    }

    init(data) {
        this.characterConfig = data.characterConfig;
    }

    create() {
        // 1. 배경 이미지 생성 (스케일링 없음)
        this.bg = this.add.image(0, 0, 'background')
            .setOrigin(0)
            .setDepth(0);
        this.add.image(625,643,'skillslot')
            .setScale(1.5)
            .setDepth(1)
        this.add.image(400,360,'MrangerC')
            .setScale(0.3)
            .setDepth(1)
        // 2. 절대 좌표 기준 그리드 라인 생성
        this.drawAbsoluteGrid();

        // 3. 절대 좌표 기준 스킬 슬롯 생성
        this.createSkillSlots();

        // 4. 스킬 아이콘 생성 및 드래그 설정
        this.showSkillSet();
        this.setupShortcuts();
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.escKey.on('down', () => {
            this.scene.start('MainScene'); // 메인 씬으로 복귀
        });
    }

    // 절대 좌표 그리드 라인 생성
    drawAbsoluteGrid() {
        const graphics = this.add.graphics()
            .setDepth(0.5)
            .setAlpha(0.3);

        const camera = this.cameras.main;
        const width = camera.width;
        const height = camera.height;
        const step = 50; // 50px 고정 간격

        graphics.lineStyle(1, 0xCCCCCC);

        // 가로선 (절대 좌표 기준)
        for (let y = 0; y <= height; y += step) {
            graphics.moveTo(0, y);
            graphics.lineTo(width, y);
        }

        // 세로선 (절대 좌표 기준)
        for (let x = 0; x <= width; x += step) {
            graphics.moveTo(x, 0);
            graphics.lineTo(x, height);
        }

        graphics.strokePath();
    }

    createSkillSlots() {
        const slotPositions = {
            Q: { x: 475, y: 625 },
            W: { x: 525, y: 625 },
            E: { x: 575, y: 625 },
            R: { x: 625, y: 625 },
            T: { x: 675, y: 625 },
            Y: { x: 725, y: 625 },
            Ctrl: { x: 775, y: 625 },
            A: { x: 475, y: 675 },
            S: { x: 525, y: 675 },
            D: { x: 575, y: 675 },
            F: { x: 625, y: 675 },
            G: { x: 675, y: 675 },
            H: { x: 725, y: 675 },
            Ctrl2: { x: 775, y: 675 }
        };

        Object.entries(slotPositions).forEach(([key, pos]) => {
            const zone = this.add.zone(pos.x, pos.y, 50, 50)
                .setRectangleDropZone(50, 50)
                .setName(key);

            const border = this.add.graphics()
                .lineStyle(2, 0x666666)
                .strokeRect(pos.x - 25, pos.y - 25, 50, 50)
                .setDepth(1);

            this.skillSlots.set(key, { zone, skill: null, border });
        });
    }

    // 스킬 아이콘 생성 및 드래그 설정
    showSkillSet() {
        const { jobKey, skills } = this.characterConfig;
        const startX = 250;
        const startY = 500;
        const spacing = 40;

        skills.useskills.forEach((skillNum, index) => {
            const x = startX + (index * spacing);
            const icon = this.add.image(x, startY, `${jobKey}_skill${skillNum}`)
                .setScale(1.5)
                .setDepth(2)
                .setInteractive({ draggable: true }); // 드래그 가능 설정

            // 드래그 이벤트 핸들러
            icon.on('dragstart', () => {
                this.draggingSkill = icon;
                icon.setTint(0x666666); // 드래그 시 색상 변경
            });

            icon.on('drag', (pointer) => {
                icon.x = pointer.x;
                icon.y = pointer.y;
                this.highlightClosestSlot(icon);
            });

            icon.on('dragend', () => {
                icon.clearTint();
                this.handleSkillDrop(icon);
                this.draggingSkill = null;
            });
        });
    }

    handleSkillDrop(skillIcon) {
        // 1. 중복 스킬 체크 (모든 슬롯 검사)
        let isDuplicate = false;
        this.skillSlots.forEach((slot) => {
            if (slot.skill === skillIcon) {
                isDuplicate = true;
            }
        });

        // 2. 가장 가까운 슬롯 찾기
        const closestSlot = this.findClosestSlot(skillIcon);

        // 3. 중복이 아니고 유효한 슬롯일 경우 할당
        if (closestSlot && !isDuplicate) {
            if (closestSlot.skill) {
                // 기존 슬롯의 스킬 원위치
                closestSlot.skill.x = closestSlot.skill.input.dragStartX;
                closestSlot.skill.y = closestSlot.skill.input.dragStartY;
                closestSlot.skill = null;
            }
            // 새 스킬 할당
            skillIcon.x = closestSlot.zone.x;
            skillIcon.y = closestSlot.zone.y;
            closestSlot.skill = skillIcon;
        } else {
            // 중복 또는 유효하지 않은 슬롯: 원위치
            skillIcon.x = skillIcon.input.dragStartX;
            skillIcon.y = skillIcon.input.dragStartY;
            if (isDuplicate) {
                this.showDuplicateFeedback(skillIcon); // 중복 피드백
            }
        }

        this.highlightClosestSlot(null);
    }
    
    // 중복 스킬 피드백 표시 - 이 메소드가 누락되었습니다
    showDuplicateFeedback(skillIcon) {
        // 빨간색 텍스트로 중복 알림
        const feedbackText = this.add.text(
            skillIcon.x, 
            skillIcon.y - 30, 
            '중복 스킬!', 
            { 
                fontSize: '16px', 
                fill: '#FF0000',
                stroke: '#000000',
                strokeThickness: 3
            }
        ).setOrigin(0.5);
        
        // 텍스트 애니메이션 후 제거
        this.tweens.add({
            targets: feedbackText,
            y: feedbackText.y - 20,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                feedbackText.destroy();
            }
        });
        
        // 스킬 아이콘 흔들림 효과
        this.tweens.add({
            targets: skillIcon,
            x: skillIcon.x + 5,
            duration: 50,
            yoyo: true,
            repeat: 3
        });
    }
    
    setupShortcuts() {
        this.input.keyboard.on('keydown-Q', () => {
            const slot = this.skillSlots.get('Q');
            if (slot.skill) this.triggerSkill(slot.skill);
        });
        this.input.keyboard.on('keydown-W', () => {
            const slot = this.skillSlots.get('W');
            if (slot.skill) this.triggerSkill(slot.skill);
        });
        this.input.keyboard.on('keydown-E', () => {
            const slot = this.skillSlots.get('E');
            if (slot.skill) this.triggerSkill(slot.skill);
        });
        this.input.keyboard.on('keydown-R', () => {
            const slot = this.skillSlots.get('R');
            if (slot.skill) this.triggerSkill(slot.skill);
        });
        this.input.keyboard.on('keydown-T', () => {
            const slot = this.skillSlots.get('T');
            if (slot.skill) this.triggerSkill(slot.skill);
        });
        this.input.keyboard.on('keydown-Y', () => {
            const slot = this.skillSlots.get('Y');
            if (slot.skill) this.triggerSkill(slot.skill);
        });
    }

    triggerSkill(skillIcon) {
        // Phaser 3.60에서는 파티클 시스템이 변경되었습니다
        // ParticleEmitterManager 대신 ParticleEmitter를 사용합니다
        const particles = this.add.particles();
        
        // 파티클 이미터 생성
        const emitter = particles.createEmitter({
            speed: { min: 50, max: 100 },
            scale: { start: 0.5, end: 0 },
            alpha: { start: 1, end: 0 },
            lifespan: 500,
            blendMode: 'ADD'
        });
        
        // 파티클 효과 위치 설정
        particles.setPosition(skillIcon.x, skillIcon.y);
        
        // 파티클에 텍스처 설정 (flare 대신 기존 스킬 아이콘 사용)
        emitter.setTexture(skillIcon.texture.key);
        
        // 파티클 버스트 (한번에 여러 개 생성)
        emitter.explode(10);
        
        // 스킬 아이콘 애니메이션
        this.tweens.add({
            targets: skillIcon,
            scale: 1.8,
            duration: 100,
            yoyo: true,
            onComplete: () => {
                // 애니메이션 완료 후 파티클 제거
                setTimeout(() => {
                    particles.destroy();
                }, 500);
            }
        });
    }

    findClosestSlot(icon) {
        let closest = null;
        let minDistance = Infinity;

        this.skillSlots.forEach((slot, key) => {
            const distance = Phaser.Math.Distance.Between(
                icon.x, icon.y,
                slot.zone.x, slot.zone.y
            );

            if (distance < minDistance && distance < 50) {
                minDistance = distance;
                closest = slot;
            }
        });

        return closest;
    }
    
    highlightClosestSlot(icon) {
        this.skillSlots.forEach((slot) => {
            slot.border.clear() // 기존 테두리 제거
                .lineStyle(2, 0x666666) // 기본 색상 복원
                .strokeRect(
                    slot.zone.x - 25, 
                    slot.zone.y - 25, 
                    50, 
                    50
                );
        });

        if (!icon) return; // ✅ null 체크 추가

        const closestSlot = this.findClosestSlot(icon);
        if (closestSlot) {
            closestSlot.border.clear()
                .lineStyle(2, 0x00FF00) // 초록색 하이라이트
                .strokeRect(
                    closestSlot.zone.x - 25, 
                    closestSlot.zone.y - 25, 
                    50, 
                    50
                );
        }
    }
}